import { Schema, model, models, Types, Model } from "mongoose";

import { IResourceSchema, Resource } from "./Resource";

export interface IFolderSchema {
    name: string;
    root: Types.ObjectId;
    folders?: [Types.ObjectId];
    resources?: [Types.ObjectId];
    fullPath?: string;
}

const folderSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        root: {
            type: Types.ObjectId,
            ref: "Folder",
        },
        folders: [{ type: Types.ObjectId, ref: "Folder" }],
        resources: [{ type: Types.ObjectId, ref: "Resource" }],
        fullPath: String,
    },
    {
        collection: "Folder",
    }
);

folderSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

folderSchema.set("toJSON", {
    virtuals: true,
    transform: function (_, ret) {
        delete ret._id;
    },
});

export const Folder: Model<IFolderSchema> =
    models?.Folder || model("Folder", folderSchema);
