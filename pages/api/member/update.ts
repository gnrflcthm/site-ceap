import "../../../firebase/admin";
import { getAuth } from "firebase-admin/auth";
import { AccountType, User } from "@prisma/client";
import authenticatedHandler from "@util/api/authenticatedHandler";

import { prisma } from "prisma/db";

export default authenticatedHandler([
    AccountType.CEAP_SUPER_ADMIN,
    AccountType.MS_ADMIN,
]).patch(async (req, res) => {
    const {
        id,
        email,
        accountType,
    } = req.body;

    const auth = getAuth();

    const userExists = await prisma.user.findFirst({ where: { email } });
    const registrationExists = await prisma.userRegistration.findFirst({
        where: { email },
    });

    try {
        if ((userExists && userExists.id !== id) || registrationExists) {
            res.statusMessage = "Email has already been taken";
            throw new Error("Email already in use.");
        }

        const user = await prisma.user.findFirst({ where: { id } });
        if (user) {
            const fbUser = await auth.getUser(user.authId);
            let updated: string[] = [];
            Object.keys(req.body).map((key) => {
                if (req.body[key] !== undefined) {
                    if (req.body[key].trim() !== user[key as keyof User]) {
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
            await auth.updateUser(fbUser.uid, newData);
            if (updated.includes("accountType")) {
                await auth.setCustomUserClaims(fbUser.uid, {
                    role: accountType,
                });
            }

            // MongoDB Updates
            newData = { ...req.body };
            delete newData["id"];
            await prisma.user.update({
                where: {
                    id,
                },
                data: {
                    ...newData,
                },
            });
        }
        res.status(200);
    } catch (err) {
        console.log(err);
        res.statusMessage = res.statusMessage || "Error in updating user.";
        res.status(400);
    }

    res.end();
});
