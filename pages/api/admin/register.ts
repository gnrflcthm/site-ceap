import {
    connectDB,
    User,
    UserRegistration,
    MSAdminRegistration,
    MemberSchool,
} from "@db/index";
import handler from "@util/api/handler";
import { sendAdminRegisterNotif } from "@util/email";

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

    //TODO: Add Validation for existing users using email or other unique identifier

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
    } catch (err) {
        console.log(err);
        res.statusMessage = "Error in Registering";
        res.status(418);
    }
    res.end();
});
