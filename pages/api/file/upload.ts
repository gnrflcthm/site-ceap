import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, File } from "formidable";

import { unlink } from "fs";
import { extname } from "path";

import { getStorage, Storage } from "firebase-admin/storage";
import "../../../firebase";

import { prisma } from "../../../prisma/db";
import { FileClassification } from "@prisma/client";
import { getFileType } from "../../../util";

type ProcessedFiles = Array<[string, File]>;
type UploadFormData = {
    classification?: FileClassification;
};
type UploadFormDataKey = keyof UploadFormData;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    // TODO: User Validation

    const formData: UploadFormData = {};
    const data: ProcessedFiles | undefined = await new Promise<
        ProcessedFiles | undefined
    >((resolve, reject) => {
        const form = new IncomingForm({ keepExtensions: true });
        const files: ProcessedFiles = [];

        form.on("file", (field, file) => files.push([field, file]));

        form.on(
            "field",
            (field, value) =>
                (formData[field as UploadFormDataKey] =
                    value as FileClassification)
        );

        form.on("error", (err) => reject(err));
        form.once("end", () => resolve(files));
        form.parse(req);
    });

    if (data?.length) {
        for (const file of data) {
            try {
                uploadFile(file, formData.classification);
            } catch (err) {
                console.log(err);
            }
        }
    }
    res.end();
};

const uploadFile = async (
    file: [string, File],
    classification: FileClassification | string = FileClassification.OTHERS
) => {
    const storage: Storage = getStorage();

    let bucket = storage.bucket(process.env.BUCKET_URL);

    let filename = file[1].originalFilename || file[1].newFilename;
    let destination = `${classification}/${filename}`;

    // TODO: Error Handling

    // TODO: Path Handling / Folder Creation

    let response = await bucket.upload(file[1].filepath, {
        destination,
    });

    let gid = response[0].metadata.id;

    // Creating Record Of Resources
    await prisma.resource.create({
        data: {
            classification: classification as FileClassification,
            contentType: file[1].mimetype || "",
            filename: file[1].originalFilename || file[1].newFilename,
            gid,
            dateAdded: new Date(),
            filepath: destination,
            fileType: getFileType(filename),
        },
    });

    // Deleting Temp File
    unlink(file[1].filepath, (err) => {
        if (err) console.log(err);
    });
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
