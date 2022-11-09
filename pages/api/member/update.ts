import "../../../firebase/admin";
import { getAuth } from "firebase-admin/auth";
import authenticatedHandler from "@util/api/authenticatedHandler";

import { connectDB, IUserSchema, User, UserRegistration } from "@db/index";
import { AccountType } from "@util/Enums";
import { Action, logAction } from "@util/logging";

export default authenticatedHandler([
    AccountType.CEAP_SUPER_ADMIN,
    AccountType.MS_ADMIN,
]).patch(async (req, res) => {
    const { id, email, accountType } = req.body;

    const auth = getAuth();

    await connectDB();

    const userExists = await User.findOne({ email });
    const registrationExists = await UserRegistration.findOne({ email });

    try {
        if ((userExists && userExists.id !== id) || registrationExists) {
            res.statusMessage = "Email has already been taken";
            throw new Error("Email already in use.");
        }

        const user = await User.findById(id);
        if (user) {
            const fbUser = await auth.getUser(user.authId);
            let updated: string[] = [];
            Object.keys(req.body).map((key) => {
                if (req.body[key] !== undefined) {
                    if (
                        req.body[key].trim() !== user[key as keyof IUserSchema]
                    ) {
                        updated.push(key);
                    }
                }
            });

            // Firebase Updates
            let newData: { [key: string]: string } = {};
            for (let key of updated) {
                if (["displayName", "email", "mobileNumber"].includes(key)) {
                    newData[key === "mobileNumber" ? "phoneNumber" : key] =
                        req.body[key];
                }
            }

            if (req.body.mobileNumber.trim() === "")
                delete newData["phoneNumber"];

            await auth.updateUser(fbUser.uid, newData);
            if (updated.includes("accountType")) {
                await auth.setCustomUserClaims(fbUser.uid, {
                    role: accountType,
                });
            }

            // MongoDB Updates
            newData = { ...req.body };
            delete newData["id"];
            await User.findByIdAndUpdate(id, { ...newData });

            if (user) {
                let status = `Updated user info. (${user.displayName})`;
                let action: Action = Action.UPDATE_USER;
                if (updated.includes("accountType")) {
                    if (
                        [
                            AccountType.CEAP_SUPER_ADMIN,
                            AccountType.MS_ADMIN,
                        ].includes(accountType)
                    ) {
                        status = `Promoted user and updated info. (${user.displayName})`;
                    } else {
                        status = `Demoted user and updated info. (${user.displayName})`;
                    }
                }
                await logAction(user, action, status);
            }
        }
        res.status(200);
    } catch (err) {
        console.log(err);
        res.statusMessage = res.statusMessage || "Error in updating user.";
        res.status(400);
    }

    res.end();
});
