import { IUserSchema } from "@db/index";

function logAction(
    actor: IUserSchema,
    action: string,
    details: string
): Promise<void> {
    return new Promise(async (resolve, reject) => {
        try {
        } catch (err) {
            reject(err);
        }
    });
}
