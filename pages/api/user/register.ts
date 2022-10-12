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

// TODO: Handle all possible errors (duplication, taken unique values, etc.as)

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

    console.table(req.body);

    try {
        // Validating if a user or user registration exists.
        const existingRegistration = await prisma.userRegistration.findFirst({
            where: {
                OR: [
                    {
                        email: email.trim(),
                    },
                    {
                        memberSchoolId: organizationId,
                        schoolId: schoolId?.trim(),
                    },
                ],
                NOT: {
                    schoolId: "",
                },
            },
        });

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: email.trim(),
                    },
                    {
                        memberSchoolId: organizationId,
                        schoolId: schoolId?.trim(),
                    },
                ],
                NOT: {
                    schoolId: "",
                },
            },
        });

        const existingAdminRegistration =
            await prisma.mSAdminRegistration.findFirst({
                where: {
                    email,
                },
            });


        if (existingUser || existingRegistration || existingAdminRegistration) {
            res.statusMessage =
                "A user already exists with the given email or school id.";
            res.status(400);
            res.end();
            return;
        }

        // Creates New User Registration Record
        await prisma.userRegistration.create({
            data: {
                firstName,
                lastName,
                middleName,
                schoolId,
                birthday: new Date(birthday),
                email: email,
                mobileNumber: mobile,
                memberSchoolId: organizationId,
            },
        });
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
