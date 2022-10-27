import {
    Entity,
    Property,
    PrimaryKey,
    SerializedPrimaryKey,
    ManyToOne,
    Enum,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Folder } from "./Folder";

import { User } from "./User";

@Entity({ collection: "Resource" })
export class Resource {
    @PrimaryKey({ type: "ObjectId" })
    _id!: ObjectId;

    @SerializedPrimaryKey({ type: "string" })
    id!: string;

    @Property({ type: "string" })
    filename!: string;

    @ManyToOne({ entity: "Folder" })
    folder!: Folder;

    @Property({ type: "string" })
    blobPath!: string;

    @Property({ type: "datetime" })
    dateAdded = new Date();

    @Enum({ items: () => FileClassification, type: "string" })
    classification?: FileClassification;

    @Enum({ items: () => FileType, type: "string" })
    fileType?: FileType;

    @Property({ type: "string" })
    contentType?: string;

    @Enum({ items: () => FileAccessibility, type: "string" })
    accessibility?: FileAccessibility;

    @Enum({ items: () => RequestStatus, type: "string" })
    status?: RequestStatus;

    @ManyToOne({ entity: "User" })
    uploadedBy?: User;
}

export enum FileClassification {
    CHRISTIAN_FORMATION = "CHRISTIAN_FORMATION",
    BASIC_EDUCATION = "BASIC_EDUCATION",
    HIGHER_EDUCATION = "HIGHER_EDUCATION",
    TECHINICAL_VOCATION_EDUCATION = "TECHINICAL_VOCATION_EDUCATION",
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
}

export enum FileAccessibility {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    HIDDEN = "HIDDEN",
}

export enum RequestStatus {
    FOR_ADMIN_REVIEW = "FOR_ADMIN_REVIEW",
    FOR_CEAP_REVIEW = "FOR_CEAP_REVIEW",
    APPROVED = "APPROVED",
}
