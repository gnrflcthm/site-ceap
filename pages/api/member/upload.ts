import authenticatedHandler from "@util/api/authenticatedHandler";
import { Files } from "formidable";
import { uploadMultiple, uploadToTemp } from "@util/functions/blob";
import { contentType } from "mime-types";

import { verifyFileType } from "@util/helper";
import { rm } from "fs/promises";

import { connectDB, Resource } from "@db/index";
import { FileAccessibility, RequestStatus } from "@util/Enums";

export default authenticatedHandler().post(async (req, res) => {
    const files = req.files;

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
                    return;
                }
            }
        }
        res.statusMessage = "Successfully Uploaded Files";
        res.status(200);
        res.end();

        await connectDB();

        try {
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
                        accessibility: FileAccessibility.HIDDEN,
                        status: RequestStatus.FOR_ADMIN_REVIEW,
                        blobPath,
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
                    accessibility: FileAccessibility.HIDDEN,
                    status: RequestStatus.FOR_ADMIN_REVIEW,
                    blobPath,
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
