import {
    Entity,
    Property,
    PrimaryKey,
    SerializedPrimaryKey,
    ManyToOne,
    OneToMany,
    Collection,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Resource } from "./Resource";

@Entity({ collection: "Folder" })
export class Folder {
    @PrimaryKey({ type: "ObjectId" })
    _id!: ObjectId;

    @SerializedPrimaryKey({ type: "string" })
    id!: string;

    @Property({ type: "string" })
    name!: string;

    @ManyToOne({ entity: "Folder" })
    root?: Folder;

    @OneToMany(() => Folder, (folder) => folder.root)
    folders = new Collection<Folder>(this);

    @OneToMany(() => Resource, (resource) => resource.folder)
    resources = new Collection<Resource>(this);
}
