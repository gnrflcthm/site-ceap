import { Schema, model, Types, models, Model } from "mongoose";

export interface IMSAdminRegistrationSchema {
    firstName: string;
    middleName?: string;
    lastName: string;
    email: string;
    mobileNumber?: string;
    registeredAt: Date;
    memberSchool?: Types.ObjectId;
}

const msAdminRegistrationSchema = new Schema<IMSAdminRegistrationSchema>(
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
        memberSchool: {
            type: Types.ObjectId,
            ref: "MemberSchool",
            required: true,
        },
    },
    {
        collection: "MSAdminRegistration",
    }
);

msAdminRegistrationSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

msAdminRegistrationSchema.set("toJSON", {
    virtuals: true,  
    versionKey: false,  
    transform: function (_, ret) {
        delete ret._id;
    },
});

export const MSAdminRegistration: Model<IMSAdminRegistrationSchema> =
    models.MSAdminRegistration ||
    model("MSAdminRegistration", msAdminRegistrationSchema);
