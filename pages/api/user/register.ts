import handler from "@util/api/handler";

import { prisma } from "../../../prisma/db";

interface RegistrationData {
    firstName: string;
    lastName: string;
    middleName: string;
    birthday: string;
    organizationId: string;
    email: string;
    mobile: string;
    schoolId?: string;
}

export default handler().post(async (req, res) => {
    const {
        firstName,
        lastName,
        middleName,
        birthday,
        email,
        mobile,
        organizationId,
        schoolId,
    } = req.body as RegistrationData;

    console.log("called");

    try {
        await prisma.userRegistration.create({
            data: {
                firstName,
                lastName,
                middleName,
                birthday: new Date(birthday),
                emailAddress: email,
                mobileNumber: mobile,
                memberSchoolId: organizationId,
            },
        });
    } catch (e) {
        console.log("Unable to submit user registration", e);
        res.status(200).json({ status: "error", log: e });
        res.end();
        return;
    }
    res.status(200).json({ status: "success" });
});
