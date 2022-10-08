import { AccountType } from "@prisma/client";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { prisma } from "../../../prisma/db";

export default authenticatedHandler().post(async (req, res) => {
    try {
        const admin = await prisma.user.findFirst({
            where: {
                authId: req.uid,
            },
        });

        if (admin) {
            let admins = [];
            switch (admin.accountType) {
                case AccountType.MS_ADMIN:
                    admins = await prisma.user.findMany({
                        where: {
                            accountType: AccountType.MS_ADMIN,
                            memberSchoolId: admin.memberSchoolId,
                        },
                    });
                    break;
                case AccountType.CEAP_SUPER_ADMIN:
                    admins = await prisma.user.findMany({
                        where: {
                            accountType: AccountType.MS_ADMIN,
                        },
                        include: {
                            memberSchool: true,
                        },
                    });
                    break;
                default:
                    res.statusMessage =
                        "You do not have sufficient permissions to access this route.";
                    res.status(401);
                    res.end();
                    return;
            }
            res.status(200).json(admins);
        }
    } catch (err) {
        console.log(err);
        res.statusMessage = "An error has occured while retrieving data.";
        res.status(500);
    }

    res.end();
});
