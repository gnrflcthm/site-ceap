import { connectDB, IUserSchema, Log } from "@db/index";

export enum Action {
    // FILES
    MODIFY_RESOURCE = "MODIFY FILE", // Location, Accessibility, etc.
    UPLOAD_REQUEST = "UPLOAD REQUEST",
    ACCEPT_UPLOAD = "ACCEPT UPLOAD",
    REJECT_UPLOAD = "REJECT UPLOAD",
    DELETE_RESOURCE = "DELETE RESOURCE",
    UPLOAD_RESOURCE = "UPLOAD RESOURCE",
    CREATED_FOLDER = "CREATED FOLDER",
    DELETED_FOLDER = "DELETED FOLDER",
    RENAMED_FOLDER = "RENAMED FOLDER",

    // ACCOUNT
    DELETE_ACCOUNT = "DELETE ACCOUNT",
    UPDATE_USER = "UPDATE USER", // Roles, Personal Info
    CREATE_ADMIN = "CREATE ADMIN",

    // REGISTRATION
    ACCEPT_ADMIN_REGISTRATION = "ACCEPT ADMIN REGISTRATION",
    ACCEPT_USER_REGISTRATION = "ACCEPT USER REGISTRATION",
    REJECT_ADMIN_REGISTRATION = "REJECT ADMIN REGISTRATION",
    REJECT_USER_REGISTRATION = "REJECT USER REGISTRATION",
}

export function logAction(
    actor: IUserSchema,
    action: Action,
    details: string
): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
            await connectDB();
            await Log.create({
                action,
                datePerformed: new Date(),
                details,
                user: actor,
                memberSchool: actor.memberSchool,
            });
            resolve();
        } catch (err) {
            reject(err);
        }
    });
}
