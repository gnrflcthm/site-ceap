import authenticatedHandler from "@util/api/authenticatedHandler";
import { prisma } from "../../../prisma/db";
import "../../../firebase/admin";
import { CreateRequest, getAuth } from "firebase-admin/auth";
import { randomBytes } from "crypto";
import { AccountType } from "@prisma/client";
import { sendAcceptEmail } from "@util/email";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).post(async (req, res) => {
    const { id } = req.body;
    const auth = getAuth();

    try {
        let registration = await prisma.mSAdminRegistration.findFirst({
            where: {
                id,
            },
        });

        if (registration) {
            let {
                email,
                firstName,
                lastName,
                middleName,
                memberSchoolId,
                mobileNumber,
            } = registration;

            const tempPassword = randomBytes(10).toString("hex");

            const fbData: CreateRequest = {
                email,
                displayName: `${firstName} ${lastName}`,
                password: tempPassword,
            };

            if (mobileNumber) {
                fbData["phoneNumber"] = mobileNumber;
            }

            let authResult = await auth.createUser(fbData);

            auth.setCustomUserClaims(authResult.uid, {
                role: AccountType.MS_ADMIN,
            });

            const newAdmin = await prisma.user.create({
                data: {
                    authId: authResult.uid,
                    firstName,
                    lastName,
                    middleName,
                    email,
                    mobileNumber,
                    accountType: AccountType.MS_ADMIN,
                    displayName: authResult.displayName,
                    memberSchoolId,
                },
                include: {
                    memberSchool: true,
                },
            });

            await prisma.memberSchool.update({
                where: {
                    id: newAdmin.memberSchool?.id,
                },
                data: {
                    isRegistered: true,
                },
            });

            await prisma.mSAdminRegistration.delete({
                where: {
                    id
                },
            });

            await sendAcceptEmail(newAdmin, tempPassword);

            res.statusMessage = "User Created Successfully";
            res.status(200);
        } else {
            res.statusMessage = "Cannot Find Registration.";
            res.status(418);
        }
    } catch (err) {
        console.log(err);
        res.statusMessage = "An Error has occured in creating user.";
        res.status(500);
    }
    res.end();
});
