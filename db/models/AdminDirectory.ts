import { Schema, model, models, Types, Model } from "mongoose";

interface IAdminDirectorySchema {
    name: string;
    email: string[];
    memberSchool?: Types.ObjectId;
}

const adminDirectorySchema = new Schema<IAdminDirectorySchema>(
    {
        name: {
            type: String,
            required: true,
        },
        email: [String],
        memberSchool: {
            type: Types.ObjectId,
            ref: "MemberSchool",
            required: true,
        },
    },
    {
        collection: "AdminDirectory",
    }
);

adminDirectorySchema.virtual("id").get(function () {
    return this._id.toHexString();
});

adminDirectorySchema.set("toJSON", {
    virtuals: true,
    transform: function (_, ret) {
        delete ret._id;
    },
});

export const AdminDirectory: Model<IAdminDirectorySchema> =
    models.AdminDirectory || model("AdminDirectory", adminDirectorySchema);
