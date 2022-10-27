import {
    Entity,
    PrimaryKey,
    SerializedPrimaryKey,
    Property,
    OneToMany,
    Collection,
    ManyToOne,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

import { User } from "./User";

@Entity({ collection: "Log" })
export class Log {
    @PrimaryKey({ type: "ObjectId" })
    _id!: ObjectId;

    @SerializedPrimaryKey({ type: "string" })
    id!: string;

    @Property({ type: "datetime" })
    datePerformed = new Date();

    @Property({ type: "string" })
    action!: string;

    @Property({ type: "string" })
    details?: string;

    @ManyToOne({ entity: "User" })
    user!: User;
}
