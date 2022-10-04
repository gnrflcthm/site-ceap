import authenticatedHandler from "@util/api/authenticatedHandler";

import { prisma } from "../../../prisma/db";
import { sendRejectEmail } from "@util/email";
import { AccountType } from "@prisma/client";

export default authenticatedHandler([AccountType.MS_ADMIN]).post(async (req, res) => {
    const { id } = req.body;

    try {
        const user = await prisma.userRegistration.delete({
            where: {
                id,
            },
        });

        if (!user) {
            res.statusMessage = "User Does Not Exist";
            res.status(418);
            res.end();
            return;
        }

        await sendRejectEmail(user);

    } catch (err) {
        console.log(err);
    }
    res.end();
});