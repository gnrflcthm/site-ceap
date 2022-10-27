import { MemberSchool } from "./MemberSchool";

import {
    PrimaryKey,
    Property,
    ManyToOne,
    OneToMany,
    SerializedPrimaryKey,
    Unique,
    Enum,
    Entity,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

@Entity({ collection: "User" })
export class User {
    @PrimaryKey({ type: "ObjectId" })
    _id!: ObjectId;

    @SerializedPrimaryKey({ type: "string" })
    id!: string;

    @Property({ type: "string" })
    @Unique()
    authId!: string;

    @Property({ type: "string" })
    displayName?: string;

    @Property({ type: "string" })
    firstName!: string;

    @Property({ type: "string" })
    lastName!: string;

    @Property({ type: "string" })
    middleName?: string;

    @Property({ type: "string" })
    @Unique()
    email!: string;

    @Property({ type: "string" })
    schoolId?: string;

    @Property({ type: "string" })
    mobileNumber?: string;

    @Enum({ items: () => AccountType, type: "string" })
    accountType!: AccountType;

    @ManyToOne({entity: "MemberSchool"})
    memberSchool?: MemberSchool;
}

export enum AccountType {
    CEAP_SUPER_ADMIN = "CEAP_SUPER_ADMIN",
    CEAP_ADMIN = "CEAP_ADMIN",
    MS_ADMIN = "MS_ADMIN",
    MS_USER = "MS_USER",
}
