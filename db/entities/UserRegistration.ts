import {
    Entity,
    PrimaryKey,
    SerializedPrimaryKey,
    Property,
    ManyToOne,
    Unique,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { MemberSchool } from "./MemberSchool";

@Entity({ collection: "UserRegistration" })
export class UserRegistration {
    @PrimaryKey({ type: "ObjectId" })
    _id!: ObjectId;

    @SerializedPrimaryKey({ type: "string" })
    id!: string;

    @Property({ type: "string" })
    firstName!: string;

    @Property({ type: "string" })
    lastName!: string;

    @Property({ type: "string" })
    middleName?: string;

    @Property({ type: "date" })
    birthday?: Date;

    @Property({ type: "string" })
    @Unique()
    email!: string;

    @Property({ type: "string" })
    mobileNumber?: string;

    @Property({ type: "string" })
    schoolId?: string;

    @Property({ type: "datetime" })
    registeredAt = new Date();

    @ManyToOne({ entity: "MemberSchool" })
    memberSchool!: MemberSchool;
}
