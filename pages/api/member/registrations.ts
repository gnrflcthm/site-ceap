import { AccountType } from "@prisma/client";
import authenticatedHandler from "@util/api/authenticatedHandler";

import { prisma } from "../../../prisma/db";

export default authenticatedHandler().post(async (req, res) => {
    const { uid } = req;

    const admin = await prisma.user.findFirst({
        where: {
            authId: uid,
        },
    });

    if (admin?.accountType !== AccountType.MS_ADMIN) {
        res.statusMessage = "You do not have sufficient permissions.";
        res.status(403);
        res.end();
        return;
    }

    const registrations = await prisma.userRegistration.findMany({
        where: {
            memberSchoolId: admin?.memberSchoolId,
        },
    });

    res.status(200).json({ registrations });
});
