import { AccountType } from "@prisma/client";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { prisma } from "../../../prisma/db";

export default authenticatedHandler().post(async (req, res) => {
    const uid = req.uid;
    try {
        const admin = await prisma.user.findFirst({
            where: {
                authId: uid,
            },
        });

        if (req.role !== AccountType.MS_ADMIN) {
            res.statusMessage =
                "You do not have sufficient permissions to access this route.";
            res.status(401);
            res.end();
            return;
        }

        if (admin) {
            const accounts = await prisma.user.findMany({
                where: {
                    memberSchoolId: admin.memberSchoolId,
                    accountType: AccountType.MS_USER,
                },
            });
            res.status(200).json(accounts);
        }
    } catch (error) {
        res.statusMessage = "An error has occured while retrieving the data.";
        res.status(418);
    }
    res.end();
});
