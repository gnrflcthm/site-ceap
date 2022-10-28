import authenticatedHandler from "@util/api/authenticatedHandler";
import "../../../firebase/admin";
import { CreateRequest, getAuth } from "firebase-admin/auth";
import { randomBytes } from "crypto";
import { sendAcceptEmail } from "@util/email";

import { connectDB, MSAdminRegistration, User, MemberSchool } from "@db/index";

import { AccountType } from "@util/Enums";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).post(async (req, res) => {
    const { id } = req.body;
    const auth = getAuth();

    try {
        await connectDB();

        const registration = await MSAdminRegistration.findById(id).populate(
            "memberSchool",
            ["id"]
        );

        if (registration) {
            let {
                email,
                firstName,
                lastName,
                middleName,
                memberSchool,
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

            let { uid, displayName } = await auth.createUser(fbData);

            auth.setCustomUserClaims(uid, {
                role: AccountType.MS_ADMIN,
            });

            const newAdmin = await User.create({
                accountType: AccountType.MS_ADMIN,
                authId: uid,
                displayName,
                email,
                firstName,
                lastName,
                memberSchool,
                middleName,
                mobileNumber,
            });

            await MemberSchool.findByIdAndUpdate(memberSchool?.id, {
                $set: {
                    isRegistered: true,
                },
            });

            await MSAdminRegistration.findByIdAndDelete(id);

            await sendAcceptEmail(newAdmin, tempPassword);

            res.statusMessage = "User Created Successfully";
            res.status(200);
        } else {
            res.statusMessage = "Cannot Find Registration.";
            res.status(418);
        }
    } catch (err) {
        console.log(err);
        res.statusMessage =
            res.statusMessage || "An Error has occured in creating user.";
        res.status(500);
    }
    res.end();
});
