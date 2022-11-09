import authenticatedHandler from "@util/api/authenticatedHandler";
import { Files } from "formidable";
import { uploadMultiple, uploadToTemp } from "@util/functions/blob";
import { contentType } from "mime-types";

import { verifyFileType } from "@util/helper";
import { rm } from "fs/promises";

import { connectDB, Resource, User } from "@db/index";
import { AccountType, FileAccessibility, ResourceStatus } from "@util/Enums";
import { Action, logAction } from "@util/logging";
import {
    sendUserUploadResponseEmail,
} from "@util/email";

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

        const status =
            user?.accountType === AccountType.MS_ADMIN
                ? ResourceStatus.FOR_CEAP_REVIEW
                : ResourceStatus.FOR_ADMIN_REVIEW;

        try {
            if (Array.isArray(fileUpload)) {
                const uploadResponses = await uploadMultiple(
                    fileUpload,
                    "uploads"
                );
                const uploadData = uploadResponses.map(
                    ({ blobPath, filename, size }) => ({
                        dateAdded: new Date(),
                        filename: filename,
                        fileType: verifyFileType(filename),
                        contentType: contentType(filename) || "",
                        accessibility: FileAccessibility.HIDDEN,
                        status,
                        blobPath,
                        uploadedBy: user,
                        size,
                    })
                );
                await Resource.insertMany(uploadData);
                const deleteQueue: Promise<void>[] = [];

                fileUpload.forEach((file) => {
                    deleteQueue.push(rm(file.filepath));
                });

                await Promise.all(deleteQueue);
                if (user)
                    await logAction(
                        user,
                        Action.UPLOAD_REQUEST,
                        `Sent an upload request containing ${fileUpload.length} files.`
                    );
            } else {
                const { blobPath, filename, size } = await uploadToTemp(
                    fileUpload.filepath,
                    fileUpload.newFilename,
                    fileUpload.originalFilename || fileUpload.newFilename
                );
                const resource = await Resource.create({
                    dateAdded: new Date(),
                    filename: filename,
                    fileType: verifyFileType(filename),
                    contentType: contentType(filename) || "",
                    accessibility: FileAccessibility.HIDDEN,
                    status,
                    blobPath,
                    uploadedBy: user,
                    size,
                });

                await rm(fileUpload.filepath);
                if (user) {
                    await logAction(
                        user,
                        Action.UPLOAD_REQUEST,
                        "Sent an upload request."
                    );
                    await sendUserUploadResponseEmail(user, resource);
                }
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
