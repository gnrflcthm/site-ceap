import {
    connectDB,
    User,
    UserRegistration,
    MSAdminRegistration,
    MemberSchool,
    AdminDirectory,
} from "@db/index";
import handler from "@util/api/handler";
import { sendAcceptEmail, sendAdminRegisterNotif } from "@util/email";
import { AccountType } from "@util/Enums";
import { randomBytes } from "crypto";
import { getAuth } from "firebase-admin/auth";
import "../../../firebase/admin";
import { CreateRequest } from "firebase-admin/auth";

interface IRegistrationData {
    firstName: string;
    middleName: string;
    lastName: string;
    mobileNumber: string;
    email: string;
    memberSchoolId: string;
}

export default handler().post(async (req, res) => {
    const {
        email,
        firstName,
        lastName,
        middleName,
        mobileNumber,
        memberSchoolId,
    } = req.body as IRegistrationData;

    try {
        await connectDB();

        const existingUser = await User.findOne({ email });

        const existingRegistration = await MSAdminRegistration.findOne({
            email,
        });

        const existingUserRegistration = await UserRegistration.findOne({
            email,
        });

        if (existingUser || existingRegistration || existingUserRegistration) {
            res.status(400);
            res.statusMessage = "A user with the given email already exists.";
            res.end();
            return;
        }

        const existingAdminDirectory = await AdminDirectory.findOne({ email, memberSchool: memberSchoolId });

        if (existingAdminDirectory) {
            const auth = getAuth();

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
                memberSchool: memberSchoolId,
                middleName,
                mobileNumber,
            });

            const ms = await MemberSchool.findByIdAndUpdate(memberSchoolId, {
                $set: {
                    isRegistered: true,
                },
            });

            if (ms) await sendAcceptEmail(newAdmin, tempPassword, ms?.name, true);

            res.statusMessage = "Registered Successfully";
            res.status(200);

        } else {
            const memberSchool = await MemberSchool.findById(memberSchoolId);

            const userReg = await MSAdminRegistration.create({
                email,
                firstName,
                lastName,
                middleName,
                mobileNumber,
                memberSchool,
                registeredAt: new Date(),
            });

            res.statusMessage = "Registered Successfully";
            res.status(200);

            if (userReg && memberSchool) {
                await sendAdminRegisterNotif(userReg, memberSchool?.name);
            }
        }
    } catch (err) {
        console.log(err);
        res.statusMessage = "Error in Registering";
        res.status(418);
    }
    res.end();
});
