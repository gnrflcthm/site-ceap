import handler from "@util/api/handler";

import { connectDB, User, UserRegistration, MSAdminRegistration, MemberSchool } from "@db/index";
import { sendUserRegisterNotif } from "@util/email";

interface RegistrationData {
    firstName: string;
    lastName: string;
    middleName: string;
    birthday: string;
    memberSchoolId: string;
    email: string;
    mobile: string;
    schoolId?: string;
}

// TODO: Handle all possible errors (duplication, taken unique values, etc.as)

export default handler().post(async (req, res) => {
    const {
        firstName,
        lastName,
        middleName,
        // birthday,
        email,
        mobile,
        memberSchoolId,
        schoolId,
    } = req.body as RegistrationData;

    console.table(req.body);

    try {
        await connectDB();

        // Validating if a user or user registration exists.
        let existingRegistration = await UserRegistration.findOne({
            $or: [
                {
                    email: email.trim(),
                },
                {
                    "memberSchool.id": memberSchoolId,
                    schoolId: schoolId?.trim(),
                    $not: {
                        schoolId: ["", null, undefined],
                    },
                },
            ],
        });

        let existingUser = await User.findOne({
            $or: [
                {
                    email: email.trim(),
                },
                {
                    "memberSchool.id": memberSchoolId,
                    schoolId: schoolId?.trim(),
                    $not: {
                        schoolId: ["", null, undefined],
                    },
                },
            ],
        });

        let existingAdminRegistration = await MSAdminRegistration.findOne({
            email: email.trim(),
        });

        if (existingUser || existingRegistration || existingAdminRegistration) {
            res.statusMessage =
                "A user already exists with the given email or school id.";
            res.status(400);
            res.end();
            return;
        }

        const memberSchool = await MemberSchool.findById(memberSchoolId);

        // Creates New User Registration Record
        const userReg = await UserRegistration.create({
            firstName,
            lastName,
            middleName,
            schoolId,
            // birthday: new Date(birthday),
            email: email,
            mobileNumber: mobile,
            memberSchool,
            registeredAt: new Date(),
        });

        if (userReg && memberSchool) {
            await sendUserRegisterNotif(userReg, memberSchool?.name);
        }
    } catch (e) {
        console.log("Unable to submit user registration", e);
        res.statusMessage =
            "Please check that the information you have entered is valid.";
        res.status(400);
        res.end();
        return;
    }
    res.status(200).json({ status: "success" });
});
