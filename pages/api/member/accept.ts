import authenticatedHandler from "@util/api/authenticatedHandler";

import { CreateRequest, getAuth } from "firebase-admin/auth";

import { sendAcceptEmail } from "@util/email";
import { randomBytes } from "crypto";

import { connectDB, MemberSchool, User, UserRegistration } from "@db/index";
import { AccountType } from "@util/Enums";
import { Action, logAction } from "@util/logging";

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

        await connectDB();

        const user = await UserRegistration.findById(id);

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
            };

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
                memberSchool,
                schoolId,
                mobileNumber,
                middleName,
            } = user;

            const newUser = await User.create({
                email: email,
                firstName,
                lastName,
                middleName,
                schoolId,
                memberSchool,
                mobileNumber,
                authId: uid,
                accountType: AccountType.MS_USER,
                displayName: displayName || "",
            });

            await UserRegistration.findByIdAndDelete(id);

            res.statusMessage = "User Created Successfully.";
            res.status(200);

            const a = await User.findOne({ authId: req.uid });
            const ms = await MemberSchool.findById(memberSchool);
            if (ms) await sendAcceptEmail(newUser, tempPassword, ms.name);
            if (a && ms) {
                await logAction(
                    a,
                    Action.ACCEPT_USER_REGISTRATION,
                    `Accepted User Registration From ${ms.name}`
                );
            }
        } catch (error) {
            console.log(error);
            res.statusMessage = "Error in adding user.";
            res.status(500);
        }
        res.end();
    }
);
