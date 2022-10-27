import { EntityName, MikroORM } from "@mikro-orm/core";
import { MongoDriver, MongoEntityRepository } from "@mikro-orm/mongodb";
import { MemberSchool, User, Folder, Log, MSAdminRegistration, UserRegistration, Resource } from "./entities";

export function getRepo<T extends {}>(
    entity: EntityName<T>
): Promise<MongoEntityRepository<T>> {
    return new Promise<any>(async (resolve, reject) => {
        try {
            const orm = await MikroORM.init<MongoDriver>({
                entities: [User, MemberSchool, Folder, Log, MSAdminRegistration, UserRegistration, Resource],
                allowGlobalContext: true,
                clientUrl: process.env.DATABASE_URL,
                discovery: { disableDynamicFileAccess: true },
                type: "mongo",
                dbName: "core",
            });

            resolve(orm.em.getRepository(entity));
        } catch (error) {
            reject(error);
        }
    });
}

export * from "./entities";
