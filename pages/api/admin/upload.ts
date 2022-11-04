import authenticatedHandler from "@util/api/authenticatedHandler";
import { Files } from "formidable";
import { uploadMultiple, uploadToTemp } from "@util/functions/blob";
import { contentType } from "mime-types";

import { verifyFileType } from "@util/helper";
import { rm } from "fs/promises";

import { connectDB, Folder, Resource, User } from "@db/index";
import { AccountType, FileAccessibility, RequestStatus } from "@util/Enums";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).post(async (req, res) => {
    const files = req.files;
    const { accessibility, classification, location } = req.body;

    if (files) {
        const fileUpload = files["fileUpload" as keyof Files];
        if (Array.isArray(fileUpload)) {
            for (let file of fileUpload) {
                try {
                    verifyFileType(file.newFilename);
                } catch (err) {
                    res.statusMessage = "Invalid File Type Detected";
                    res.status(400);
                    res.end();

                    const deleteQueue: Promise<void>[] = [];
                    fileUpload.forEach((file) => {
                        deleteQueue.push(rm(file.filepath));
                    });
                    await Promise.all(deleteQueue);

                    return;
                }
            }
        } else {
            try {
                verifyFileType(fileUpload.newFilename);
            } catch (err) {
                res.statusMessage = "Invalid File Type Detected";
                res.status(400);
                res.end();

                await rm(fileUpload.filepath);

                return;
            }
        }
        res.statusMessage = "Successfully Uploaded Files";
        res.status(200);
        res.end();

        await connectDB();
        const user = await User.findOne({ authId: req.uid });

        try {
            const folder = await Folder.findById(location);

            if (Array.isArray(fileUpload)) {
                const uploadResponses = await uploadMultiple(
                    fileUpload,
                    "uploads"
                );

                const uploadData = uploadResponses.map(
                    ({ blobPath, filename }) => ({
                        dateAdded: new Date(),
                        filename: filename,
                        fileType: verifyFileType(filename),
                        contentType: contentType(filename) || "",
                        accessibility,
                        status: RequestStatus.APPROVED,
                        blobPath,
                        uploadedBy: user,
                        classification,
                        folder,
                    })
                );
                await Resource.insertMany(uploadData);
                const deleteQueue: Promise<void>[] = [];

                fileUpload.forEach((file) => {
                    deleteQueue.push(rm(file.filepath));
                });

                await Promise.all(deleteQueue);
            } else {
                const { blobPath, filename } = await uploadToTemp(
                    fileUpload.filepath,
                    fileUpload.newFilename,
                    fileUpload.originalFilename || fileUpload.newFilename
                );
                await Resource.create({
                    dateAdded: new Date(),
                    filename: filename,
                    fileType: verifyFileType(filename),
                    contentType: contentType(filename) || "",
                    accessibility,
                    status: RequestStatus.APPROVED,
                    blobPath,
                    uploadedBy: user,
                    classification,
                    folder,
                });

                await rm(fileUpload.filepath);
            }
        } catch (err) {
            console.log("Error in uploading files to azure");
            console.log(err);
        }
    }
});

export const config = {
    api: {
        bodyParser: false,
    },
};
