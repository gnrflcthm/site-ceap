import { Schema, model, Types, models, Model } from "mongoose";

export interface ILogSchema {
    datePerformed: Date;
    action: string;
    details?: string;
    user?: Types.ObjectId;
    memberSchool?: Types.ObjectId;
}

const logSchema = new Schema<ILogSchema>(
    {
        datePerformed: {
            type: Date,
            default: new Date(),
        },
        action: {
            type: String,
            required: true,
        },
        details: String,
        user: {
            type: Types.ObjectId,
            ref: "User",
        },
        memberSchool: {
            type: Types.ObjectId,
            ref: "MemberSchool",
        },
    },
    {
        collection: "Log",
    }
);

logSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

logSchema.set("toJSON", {
    virtuals: true,
    transform: function (_, ret) {
        delete ret._id;
    },
});

export const Log: Model<ILogSchema> = models.Log || model("Log", logSchema);
