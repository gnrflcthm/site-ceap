import formidable, { Files, Fields } from "formidable";
import { IncomingMessage, ServerResponse } from "http";
import { NextHandler } from "next-connect";
import path from "path";

// @ts-ignore
import nanoId from "nano-id";

const form = formidable({
    multiples: true,
    uploadDir: path.join(process.cwd(), "/temp"),
    filename: (_, __, part, ___) => {
        let ext = path.extname(part.originalFilename || "");
        return `${nanoId(12)}${ext ? "." + ext : ""}`;
    },
});

export default async function parseMultipartForm(
    req: IncomingMessage & { body: Fields; files: Files | undefined },
    _: ServerResponse,
    next: NextHandler
) {
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
            }
            next();
        });
    } else {
        console.log("No Files To Be Parsed");
        next();
    }
}
