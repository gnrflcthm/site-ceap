import mongoose, { Schema, model, Types, models, Model } from "mongoose";
import { AccountType } from "../../util/Enums";

export interface IUserSchema {
    authId: string;
    displayName?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    schoolId?: string;
    mobileNumber?: string;
    accountType: AccountType;
    memberSchool?: Types.ObjectId;
    resources?: [Types.ObjectId];
    logs?: [Types.ObjectId];
}

const userSchema = new Schema<IUserSchema>(
    {
        authId: {
            type: String,
        },
        displayName: {
            type: String,
        },
        firstName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        accountType: {
            type: String,
        },
        mobileNumber: {
            type: String,
        },
        schoolId: {
            type: String,
        },
        memberSchool: {
            type: Types.ObjectId,
            ref: "MemberSchool",
        },
        resources: [{ type: Types.ObjectId, ref: "Resource" }],
        logs: [{ type: Types.ObjectId, ref: "Log" }],
    },
    {
        collection: "User",
    }
);

userSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

userSchema.set("toJSON", {
    virtuals: true,
    transform: function (_, ret) {
        delete ret._id;
    },
});

export const User: Model<IUserSchema> =
    models.User || model("User", userSchema);
