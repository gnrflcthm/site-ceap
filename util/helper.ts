import { extname } from "path";
import { FileType, FileClassification } from "@util/Enums";

function verifyFileType(filename: string): FileType {
    let extension = extname(filename);

    let fileType: FileType = FileType.DOCUMENT;

    if (extension === ".pdf") {
        fileType = FileType.PDF;
    } else if ([".jpeg", ".png"].includes(extension)) {
        fileType = FileType.IMAGE;
    } else if (extension === ".mp4") {
        fileType = FileType.VIDEO;
    } else if (
        [".doc", ".docx", ".rtf", ".xls", ".xlsx", ".ppt", ".pptx"].includes(
            extension
        )
    ) {
        fileType = FileType.DOCUMENT;
    } else {
        throw new Error("Invalid File Type Detected.")
    }

    return fileType;
}

const Classifications = {
    CHRISTIAN_FORMATION: "Christian Formation",
    BASIC_EDUCATION: "Basic Education",
    HIGHER_EDUCATION: "Higher Education",
    TECHINICAL_VOCATION_EDUCATION: "Techinical Vocation Education",
    ALS_SPED: "ALS & SPED",
    PROGRAMS: "Programs",
    NATIONAL_CONVENTION: "National Convention",
    ADVOCACY: "Advocacy",
    RESEARCH: "Research",
    GENERAL_CEAP: "General CEAP",
    COCOPEA_PEAC: "COCOPEA & PEAC",
    INTERNATIONAL_LINKAGES: "International Linkages",
    OTHERS: "Others",
};

function getFileClassification(classification: FileClassification): string {
    return Classifications[classification as keyof typeof Classifications];
}

export { verifyFileType, getFileClassification };
