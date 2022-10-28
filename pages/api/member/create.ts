import authenticatedHandler from "@util/api/authenticatedHandler";
import "../../../firebase/admin";
import { getAuth } from "firebase-admin/auth";
import { randomBytes } from "crypto";

import { sendAcceptEmail } from "@util/email";

import {
    connectDB,
    MSAdminRegistration,
    User,
    UserRegistration,
} from "@db/index";
import { AccountType } from "@util/Enums";

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

        const auth = getAuth();
        let createdId = "";

        await connectDB();

        try {
            const userExists = await User.findOne({ email });
            const registrationExists = await UserRegistration.findOne({
                email,
            });
            const msRegistrationExists = await MSAdminRegistration.findOne({
                email,
            });
            if (userExists || registrationExists || msRegistrationExists) {
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

            const newUser = await User.create({
                accountType: role,
                authId: uid,
                displayName,
                email,
                firstName,
                lastName,
                middleName,
                mobileNumber,
            });

            await sendAcceptEmail(newUser, tempPassword, true);

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
