import { extname } from "path";
import { FileType } from "@prisma/client";

function getFileType(filename: string): FileType {
    let extension = extname(filename);

    let fileType: FileType = FileType.DOCUMENT;

    if (extension === ".pdf") {
        fileType = FileType.PDF;
    } else if ([".jpeg", ".png"].includes(extension)) {
        fileType = FileType.IMAGE;
    } else if (extension === ".mp4") {
        fileType = FileType.VIDEO;
    } else {
        fileType = FileType.DOCUMENT;
    }

    return fileType;
}

export { getFileType };
