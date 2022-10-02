import handler from "@util/api/handler";
import { prisma } from "../../../prisma/db";

export default handler().post(async (req, res) => {
    const registrationData = req.body;

    //TODO: Add Validation for existing users using email or other unique identifier

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                email: registrationData.email,
            },
        });

        const existingRegistration = await prisma.mSAdminRegistration.findFirst(
            {
                where: {
                    email: registrationData.email,
                },
            }
        );

        if (existingUser || existingRegistration) {
            res.status(400);
            res.statusMessage = "A user with the given email already exists.";
            res.end();
            return;
        }

        await prisma.mSAdminRegistration.create({
            data: {
                ...registrationData,
                registeredAt: new Date(),
            },
        });
        res.statusMessage = "Registered Successfully";
        res.status(200);
    } catch (err) {
        console.log(err);
        res.statusMessage = "Error in Registering";
        res.status(418);
    }
    res.end();
});
