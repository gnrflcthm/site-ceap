import { Schema, model, Types, models, Model } from "mongoose";

export interface IUserRegistrationSchema {
    firstName: string;
    middleName?: string;
    lastName: string;
    birthday?: Date;
    email: string;
    mobileNumber?: string;
    registeredAt: Date;
    schoolId?: string;
    memberSchool?: Types.ObjectId;
}

const userRegistrationSchema = new Schema<IUserRegistrationSchema>(
    {
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
        birthday: Date,
        email: {
            type: String,
            required: true,
        },
        mobileNumber: String,
        registeredAt: {
            type: Date,
            default: new Date(),
            transform: (date: Date) => date.toDateString()
        },
        schoolId: String,
        memberSchool: {
            type: Types.ObjectId,
            ref: "MemberSchool",
            required: true,
        },
    },
    {
        collection: "UserRegistration",
    }
);

userRegistrationSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

userRegistrationSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
    },
});

export const UserRegistration: Model<IUserRegistrationSchema> =
    models.UserRegistration ||
    model("UserRegistration", userRegistrationSchema);
