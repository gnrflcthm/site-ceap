// @ts-ignore
import { nanoId } from "nano-id";

import {
    BlobServiceClient,
    BlobUploadCommonResponse,
    BlobSASPermissions,
} from "@azure/storage-blob";
import { ReadStream, createReadStream, existsSync } from "fs";
import { extname } from "path";
import { File } from "formidable";

const client = BlobServiceClient.fromConnectionString(
    process.env.BLOB_CONNECTION_STRING || ""
);

export interface UploadResponse {
    blobPath: string;
    filename: string;
    response: BlobUploadCommonResponse;
    size: number | undefined;
    key: string;
}

export function uploadResource(
    file: string | ReadStream,
    destination: string,
    newFilename: string,
    originalFilename: string,
    key: string = ""
): Promise<UploadResponse> {
    return new Promise<UploadResponse>(async (resolve, reject) => {
        let f: string | ReadStream;

        if (typeof file === "string") {
            if (!existsSync(file)) {
                return reject(
                    "File Does Not Exist Or Invalid Specified File Path"
                );
            }
            f = createReadStream(file);
        } else {
            f = file;
        }

        try {
            const container = client.getContainerClient(
                process.env.BLOB_CONTAINER || "core"
            );

            await container.createIfNotExists();

            let fname = newFilename;
            let extension = extname(newFilename);
            let dest = `${destination}/${fname}`;

            while (await container.getBlockBlobClient(dest).exists()) {
                fname = `${nanoId(12)}${extension}`;
                dest = `${destination}/${fname}`;
            }

            const blob = container.getBlockBlobClient(
                `${destination}/${fname}`
            );

            const uploadRes = await blob.uploadStream(f);
            const properties = await blob.getProperties();
            resolve({
                blobPath: dest,
                filename: originalFilename,
                response: uploadRes,
                size: properties.contentLength,
                key,
            });
        } catch (error) {
            reject(error);
        }
    });
}

export function uploadToTemp(
    file: string | ReadStream,
    filename: string,
    originalFilename: string,
    key: string = ""
): Promise<UploadResponse> {
    return uploadResource(file, "uploads", filename, originalFilename, key);
}

export function uploadMultiple(
    files: File[],
    destination: string
): Promise<UploadResponse[]> {
    return new Promise<UploadResponse[]>(async (resolve, reject) => {
        const fileUploads: Promise<UploadResponse>[] = [];

        for (let file of files) {
            try {
                const stream = createReadStream(file.filepath);
                const newFilename = file.newFilename;
                const originalFilename = file.originalFilename;
                fileUploads.push(
                    uploadResource(
                        stream,
                        destination,
                        newFilename,
                        originalFilename || newFilename
                    )
                );
            } catch (error) {
                console.log(error);
            }
        }

        try {
            const uploadResponses = await Promise.all(fileUploads);
            resolve(uploadResponses);
        } catch (error) {
            reject(error);
        }
    });
}

export function generateDownloadLink(
    blobPath: string,
    filename?: string
): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
        const container = client.getContainerClient(
            process.env.BLOB_CONTAINER || "core"
        );

        if (!(await container.exists())) {
            reject("An Error Has Occured Retrieving The Resource.");
        }

        const blob = container.getBlobClient(blobPath);

        if (!(await blob.exists())) {
            reject("The Requested Resource Does Not Exist.");
        }

        const permissions = new BlobSASPermissions();
        permissions.read = true;

        const downloadLink = await blob.generateSasUrl({
            permissions,
            expiresOn: new Date(Date.now() + 1000 * 25),
            contentDisposition: filename
                ? `attachment; filename=${filename}`
                : "attachment",
        });

        resolve(downloadLink);
    });
}

export function deleteResource(blobPath: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
        const container = client.getContainerClient(
            process.env.BLOB_CONTAINER || "core"
        );

        if (!(await container.exists())) {
            reject("An Error Has Occured Retrieving The Resource.");
        }

        const blob = container.getBlobClient(blobPath);

        await blob.deleteIfExists();

        resolve();
    });
}
