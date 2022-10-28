import { Schema, model, Types, models, Model } from "mongoose";

export interface IMemberSchoolSchema {
    address: string;
    isRegistered: boolean;
    name: string;
    region: string;
    users: [Types.ObjectId];
}

const memberSchoolSchema = new Schema<IMemberSchoolSchema>(
    {
        address: {
            type: String,
        },
        isRegistered: {
            type: Boolean,
        },
        name: {
            type: String,
        },
        region: {
            type: String,
        },
        users: [{ type: Types.ObjectId, ref: "User" }],
    },
    {
        collection: "MemberSchool",
    }
);

memberSchoolSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

memberSchoolSchema.set("toJSON", {
    virtuals: true,
    transform: function (_, ret) {
        delete ret._id;
    },
});

export const MemberSchool: Model<IMemberSchoolSchema> =
    models.MemberSchool || model("MemberSchool", memberSchoolSchema);
