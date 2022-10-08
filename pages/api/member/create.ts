import { AccountType } from "@prisma/client";
import authenticatedHandler from "@util/api/authenticatedHandler";
import "../../../firebase/admin";
import { getAuth } from "firebase-admin/auth";
import { randomBytes } from "crypto";

import { prisma } from "prisma/db";

export default authenticatedHandler([AccountType.CEAP_SUPER_ADMIN]).post(
    async (req, res) => {
        const {
            email,
            firstName,
            lastName,
            middleName,
            mobileNumber,
            isSuperAdmin,
        } = req.body;

        console.table(req.body);

        const auth = getAuth();
        let createdId = "";

        try {
            const userExists = await prisma.user.findFirst({
                where: {
                    email,
                },
            });
            const registrationExists = await prisma.userRegistration.findFirst({
                where: {
                    email,
                },
            });
            if (userExists || registrationExists) {
                res.statusMessage = "Email already in use.";
                res.status(401);
                res.end();
                return;
            }

            const tempPassword = randomBytes(10).toString("hex");
            const { uid, displayName } = await auth.createUser({
                displayName: `${firstName} ${lastName}`,
                email,
                password: tempPassword,
            });
            createdId = uid;

            const role = isSuperAdmin
                ? AccountType.CEAP_SUPER_ADMIN
                : AccountType.CEAP_ADMIN;

            auth.setCustomUserClaims(uid, {
                role,
            });

            const newUser = await prisma.user.create({
                data: {
                    accountType: role,
                    authId: uid,
                    displayName,
                    email,
                    firstName,
                    lastName,
                    middleName,
                    mobileNumber,
                },
            });
            console.log(tempPassword);
            res.status(200);
        } catch (err) {
            try {
                let user = await auth.getUser(createdId);
                await auth.deleteUser(user.uid);
            } catch (err) {}

            console.log(err);
            res.status(200).statusMessage =
                "An error has occured creating user.";
        }
        res.end();
    }
);
