import { extname } from "path";
import { FileType, FileClassification } from "@util/Enums";

function verifyFileType(filename: string): FileType {
    let extension = extname(filename);

    let fileType: FileType = FileType.DOCUMENT;

    if (extension === ".pdf") {
        fileType = FileType.PDF;
    } else if ([".jpeg", ".jpg", ".png"].includes(extension)) {
        fileType = FileType.IMAGE;
    } else if ([".mp4", ".mov", ".avi"].includes(extension)) {
        fileType = FileType.VIDEO;
    } else if (extension === ".mp3") {
        fileType = FileType.AUDIO;
    } else if (
        [".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx"].includes(extension)
    ) {
        fileType = FileType.DOCUMENT;
    } else {
        throw new Error("Invalid File Type Detected.");
    }

    return fileType;
}

export const Classifications = {
    CHRISTIAN_FORMATION: "Christian Formation",
    BASIC_EDUCATION: "Basic Education",
    HIGHER_EDUCATION: "Higher Education",
    TECHNICAL_VOCATION_EDUCATION: "Technical Vocation Education",
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

export const SelectClassifications = {
    "Christian Formation": FileClassification.CHRISTIAN_FORMATION,
    "Basic Education": FileClassification.BASIC_EDUCATION,
    "Higher Education": FileClassification.HIGHER_EDUCATION,
    "Technical Vocation Education":
        FileClassification.TECHNICAL_VOCATION_EDUCATION,
    "ALS & SPED": FileClassification.ALS_SPED,
    Programs: FileClassification.PROGRAMS,
    "National Convention": FileClassification.NATIONAL_CONVENTION,
    Advocacy: FileClassification.ADVOCACY,
    Research: FileClassification.RESEARCH,
    "General CEAP": FileClassification.GENERAL_CEAP,
    "COCOPEA & PEAC": FileClassification.COCOPEA_PEAC,
    "International Linkages": FileClassification.INTERNATIONAL_LINKAGES,
    Others: FileClassification.OTHERS,
};

function getFileClassification(classification: FileClassification): string {
    return Classifications[classification as keyof typeof Classifications];
}

export { verifyFileType, getFileClassification };
