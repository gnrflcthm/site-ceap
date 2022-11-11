import authenticatedHandler from "@util/api/authenticatedHandler";
import { File } from "formidable";
import {
    uploadMultiple,
    UploadResponse,
    uploadToTemp,
} from "@util/functions/blob";
import { contentType } from "mime-types";

import { verifyFileType } from "@util/helper";
import { rm } from "fs/promises";

import { connectDB, Folder, IResourceSchema, Resource, User } from "@db/index";
import { AccountType, ResourceStatus } from "@util/Enums";
import { Action, logAction } from "@util/logging";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).post(async (req, res) => {
    const files = req.files;
    Object.keys(req.body).forEach(
        (key) => (req.body[key] = JSON.parse(req.body[key]))
    );
    if (req.files) {
        const fileKeys = Object.keys(req.files);
        try {
            for (let key of fileKeys) {
                if (Array.isArray(req.files[key]))
                    throw new Error("Invalid Fields Detected.");
                const file = req.files[key] as File;
                verifyFileType(file.newFilename);
            }
        } catch (err) {
            if (err instanceof Error) console.error(err.message);

            res.statusMessage = "Bad Request.";
            res.status(400).end();

            const deleteQueue: Promise<void>[] = [];
            for (let key of fileKeys) {
                if (Array.isArray(req.files[key])) {
                    const files = req.files[key] as unknown as File[];
                    files.forEach((file) =>
                        deleteQueue.push(rm(file.filepath))
                    );
                } else {
                    const file = req.files[key] as File;
                    deleteQueue.push(rm(file.filepath));
                }
            }

            await Promise.all(deleteQueue);
            return;
        }

        res.statusMessage = "Successfully Uploaded Files";
        res.status(200);
        res.end();

        await connectDB();
        const user = await User.findOne({ authId: req.uid });

        try {
            const uploadQueue: Promise<UploadResponse>[] = [];
            for (let key of fileKeys) {
                const file = req.files[key] as File;
                uploadQueue.push(
                    uploadToTemp(
                        file.filepath,
                        file.newFilename,
                        file.originalFilename || file.newFilename,
                        key
                    )
                );
            }

            const uploadRes = await Promise.all(uploadQueue);

            const uploadData = uploadRes.map(
                ({ blobPath, filename, size, key }) => {
                    const fileData: IResourceSchema = {
                        ...req.body[key],
                        dateAdded: new Date(),
                        fileType: verifyFileType(filename),
                        contentType: contentType(filename) || "",
                        status: ResourceStatus.APPROVED,
                        blobPath,
                        size,
                        uploadedBy: user,
                        // memberSchool: user?.memberSchool,
                    };
                    return fileData;
                }
            );

            await Resource.insertMany(uploadData);

            const deleteQueue: Promise<void>[] = [];
            for (let key of fileKeys) {
                if (Array.isArray(req.files[key])) {
                    const files = req.files[key] as unknown as File[];
                    files.forEach((file) =>
                        deleteQueue.push(rm(file.filepath))
                    );
                } else {
                    const file = req.files[key] as File;
                    deleteQueue.push(rm(file.filepath));
                }
            }

            await Promise.all(deleteQueue);

            if (user) {
                await logAction(
                    user,
                    Action.UPLOAD_REQUEST,
                    `Sent an upload request containing ${
                        Object.keys(req.files).length
                    } file${Object.keys(req.files).length === 1 ? "" : "s"}.`
                );
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
