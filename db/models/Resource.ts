import { Schema, model, Types, models, Model } from "mongoose";

import {
    FileAccessibility,
    FileClassification,
    FileType,
    ResourceStatus,
} from "../../util/Enums";

export interface IResourceSchema {
    filename: string;
    description?: string;
    thumbnail?: string;
    blobPath: string;
    dateAdded: Date;
    contentType: string;
    accessibility: FileAccessibility;
    status: ResourceStatus;
    folder?: Types.ObjectId;
    classification: FileClassification;
    fileType: FileType;
    size?: number;
    uploadedBy?: Types.ObjectId;
    memberSchool?: Types.ObjectId;
}

const resourceSchema = new Schema<IResourceSchema>(
    {
        filename: {
            type: String,
        },
        description: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        folder: {
            type: Types.ObjectId,
            ref: "Folder",
        },
        blobPath: {
            type: String,
        },
        dateAdded: {
            type: Date,
            default: new Date(),
        },
        classification: {
            type: String,
            enum: FileClassification,
        },
        fileType: {
            type: String,
            enum: FileType,
        },
        contentType: {
            type: String,
        },
        accessibility: {
            type: String,
            enum: FileAccessibility,
        },
        status: {
            type: String,
            enum: ResourceStatus,
        },
        size: Number,
        uploadedBy: {
            type: Types.ObjectId,
            ref: "User",
        },
        memberSchool: {
            type: Types.ObjectId,
            ref: "MemberSchool",
        },
    },
    {
        collection: "Resource",
    }
);

resourceSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

resourceSchema.set("toJSON", {
    virtuals: true,
    transform: function (_, ret) {
        delete ret._id;
    },
});

export const Resource: Model<IResourceSchema> =
    models.Resource || model("Resource", resourceSchema);
