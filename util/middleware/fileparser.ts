import formidable, { Files, Fields } from "formidable";
import { IncomingMessage, ServerResponse } from "http";
import { NextHandler } from "next-connect";
import path, { join } from "path";

// @ts-ignore
import nanoId from "nano-id";
import { mkdirSync, existsSync } from "fs";

const form = formidable({
    multiples: true,
    uploadDir: path.join(process.cwd(), "/temp"),
    filename: (_, __, part, ___) => {
        let ext = path.extname(part.originalFilename || "");
        return `${nanoId(12)}${ext || ""}`;
    },
    maxFileSize: 10_737_418_240,
});

export default async function parseMultipartForm(
    req: IncomingMessage & { body: Fields; files: Files | undefined },
    res: ServerResponse,
    next: NextHandler
) {
    // @ts-ignore
    const baseDir = global.__basedir;
    if (!existsSync(join(baseDir, "/temp"))) {
        mkdirSync(join(baseDir, "/temp"));
    }

    const contentType = req.headers["content-type"];
    if (contentType && contentType.indexOf("multipart/form-data") !== -1) {
        form.parse(req, (err, fields: Fields, files: Files) => {
            if (!err) {
                req.body = fields;
                req.files = files;
            } else {
                console.log(
                    "🚀 ~ file: fileparser.ts ~ line 25 ~ form.parse ~ err",
                    err
                );
                res.statusCode = 500;
                res.statusMessage = "Error in uploading files";
                res.end();
                return;
            }
            next();
        });
    } else {
        next();
    }
}
