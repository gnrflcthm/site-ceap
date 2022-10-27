import {
    Entity,
    PrimaryKey,
    SerializedPrimaryKey,
    Property,
    OneToMany,
    Collection,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

import { User } from "./User";

@Entity({ collection: "MemberSchool" })
export class MemberSchool {
    @PrimaryKey({ type: "ObjectId" })
    _id!: ObjectId;

    @SerializedPrimaryKey({ type: "string" })
    id!: string;

    @Property({ type: "string" })
    name!: string;

    @Property({ type: "string" })
    address!: string;

    @Property({ type: "string" })
    region!: string;

    @Property({ type: "boolean" })
    isRegistered: boolean = false;

    @OneToMany(() => User, (user) => user.memberSchool)
    users = new Collection<User>(this);
}
