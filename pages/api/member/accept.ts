import authenticatedHandler from "@util/api/authenticatedHandler";

import { CreateRequest, getAuth } from "firebase-admin/auth";

import { prisma } from "../../../prisma/db";
import { AccountType } from "@prisma/client";
import { sendAcceptEmail } from "@util/email";
import { randomBytes } from "crypto";

export default authenticatedHandler([AccountType.MS_ADMIN]).post(
    async (req, res) => {
        const { id } = req.body;

        const auth = getAuth();

        if (!id) {
            res.statusMessage = "Missing Required Fields";
            res.status(418);
            res.end();
            return;
        }

        const user = await prisma.userRegistration.findFirst({
            where: {
                id,
            },
        });

        if (!user) {
            res.statusMessage = "User Does Not Exist";
            res.status(418);
            res.end();
            return;
        }

        // TODO: Fix Model Field Name Inconsistencies

        try {
            const tempPassword = randomBytes(10).toString("hex");

            const fbData: CreateRequest = {
                displayName: `${user?.firstName} ${user?.lastName}`,
                email: user?.email,
                password: tempPassword,
            }

            if (user.mobileNumber) {
                fbData["phoneNumber"] = user.mobileNumber;
            }

            const { uid, displayName } = await auth.createUser(fbData);

            await auth.setCustomUserClaims(uid, {
                role: AccountType.MS_USER,
            });

            const {
                firstName,
                lastName,
                email,
                memberSchoolId,
                schoolId,
                mobileNumber,
                middleName,
            } = user;

            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    firstName,
                    lastName,
                    middleName,
                    schoolId,
                    memberSchoolId,
                    mobileNumber,
                    authId: uid,
                    accountType: AccountType.MS_USER,
                    displayName: displayName || "",
                },
            });

            await prisma.userRegistration.delete({
                where: {
                    id,
                },
            });

            await sendAcceptEmail(newUser, tempPassword);

            res.statusMessage = "User Created Successfully.";
            res.status(200);
        } catch (error) {
            console.log(error);
            res.statusMessage = "Error in adding user.";
            res.status(500);
        }
        res.end();
    }
);
