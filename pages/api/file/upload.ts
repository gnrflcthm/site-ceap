import { NextApiRequest, NextApiResponse } from "next";
import { IncomingForm, File } from "formidable";

import fs from "fs";

import { Dropbox } from "dropbox";

import { prisma } from "../../../prisma/db";

const dropbox = new Dropbox({ accessToken: process.env.DROPBOX_TOKEN });

type ProcessedFiles = Array<[string, File]>;

type UploadFormData = { group?: string; category?: string };
type UploadFormDataKey = keyof UploadFormData;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const formData: UploadFormData = {};
    const data: ProcessedFiles | undefined = await new Promise<
        ProcessedFiles | undefined
    >((resolve, reject) => {
        const form = new IncomingForm({ keepExtensions: true });
        const files: ProcessedFiles = [];

        form.on("file", (field, file) => files.push([field, file]));

        form.on(
            "field",
            (field, value) => (formData[field as UploadFormDataKey] = value)
        );

        form.on("error", (err) => reject(err));
        form.once("end", () => resolve(files));
        form.parse(req);
    });

    if (data?.length) {
        for (const file of data) {
            try {
                let {
                    result: { path_lower, name },
                } = await dropbox.filesUpload({
                    path: `/uploads/${file[1].originalFilename}`,
                    contents: fs.readFileSync(file[1].filepath),
                });
                let {
                    result: { url },
                } = await dropbox.sharingCreateSharedLinkWithSettings({
                    path: path_lower || "",
                    settings: {
                        audience: {
                            ".tag": "public",
                        },
                        access: {
                            ".tag": "viewer",
                        },
                    },
                });
                await prisma.resource.create({
                    data: {
                        filename: name,
                        filepath: path_lower || "",
                        downloadURL: url.replace(
                            "www.dropbox.com",
                            "dl.dropboxusercontent.com"
                        ),
                        dateAdded: new Date(),
                        category: "",
                        group: formData.group || "",
                    },
                });
                res.status(200).json({ msg: "File Uploaded" });
                fs.unlink(file[1].filepath, () =>
                    console.log(`Error Deleteing: ${file[1].filepath}`)
                );
            } catch (error) {
                console.log(error);
                res.status(500).json({ msg: "An Error Has Occured" });
            }
        }
    }
    res.end();
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
