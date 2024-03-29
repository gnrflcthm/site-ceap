export enum FileAccessibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    HIDDEN = "HIDDEN",
}

export enum ResourceStatus {
    FOR_ADMIN_REVIEW = "FOR_ADMIN_REVIEW",
    FOR_CEAP_REVIEW = "FOR_CEAP_REVIEW",
    APPROVED = "APPROVED",
    ARCHIVED = "ARCHIVED",
}

export enum FileClassification {
    CHRISTIAN_FORMATION = "CHRISTIAN_FORMATION",
    BASIC_EDUCATION = "BASIC_EDUCATION",
    HIGHER_EDUCATION = "HIGHER_EDUCATION",
    TECHNICAL_VOCATION_EDUCATION = "TECHNICAL_VOCATION_EDUCATION",
    ALS_SPED = "ALS_SPED",
    PROGRAMS = "PROGRAMS",
    NATIONAL_CONVENTION = "NATIONAL_CONVENTION",
    ADVOCACY = "ADVOCACY",
    RESEARCH = "RESEARCH",
    GENERAL_CEAP = "GENERAL_CEAP",
    COCOPEA_PEAC = "COCOPEA_PEAC",
    INTERNATIONAL_LINKAGES = "INTERNATIONAL_LINKAGES",
    OTHERS = "OTHERS",
}

export enum FileType {
    PDF = "PDF",
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    DOCUMENT = "DOCUMENT",
    AUDIO = "AUDIO",
}

export enum AccountType {
    CEAP_SUPER_ADMIN = "CEAP_SUPER_ADMIN",
    CEAP_ADMIN = "CEAP_ADMIN",
    MS_ADMIN = "MS_ADMIN",
    MS_USER = "MS_USER",
}
