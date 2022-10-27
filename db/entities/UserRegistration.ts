import {
    Entity,
    PrimaryKey,
    SerializedPrimaryKey,
    Property,
    ManyToOne,
    DateType,
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
    birthday?: DateType;

    @Property({ type: "string" })
    @Unique()
    email!: string;

    @Property({ type: "string" })
    mobileNumber?: string;

    @Property({ type: "string" })
    schoolId?: string;

    @Property({ type: "datetime" })
    registerdAt = new Date();

    @ManyToOne({ entity: "MemberSchool" })
    memberSchool!: MemberSchool;
}
