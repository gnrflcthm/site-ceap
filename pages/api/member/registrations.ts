import { AccountType } from "@prisma/client";
import authenticatedHandler from "@util/api/authenticatedHandler";

import { prisma } from "../../../prisma/db";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
    AccountType.MS_ADMIN,
]).post(async (req, res) => {
    const { uid } = req;
    try {
        const admin = await prisma.user.findFirst({
            where: {
                authId: uid,
            },
        });

        let registrations;

        if (admin) {
            switch (admin.accountType) {
                case AccountType.CEAP_ADMIN:
                case AccountType.CEAP_SUPER_ADMIN:
                    registrations = await prisma.mSAdminRegistration.findMany({
                        include: {
                            memberSchool: true,
                        },
                    });
                    break;
                case AccountType.MS_ADMIN:
                    registrations = await prisma.userRegistration.findMany({
                        where: {
                            memberSchoolId: admin?.memberSchoolId,
                        },
                    });
                    break;
                default:
                    res.statusMessage =
                        "You do not have sufficient permissions.";
                    res.status(403);
                    res.end();
                    return;
            }
            res.status(200).json(registrations);
            res.end();
        } else {
            res.statusMessage = "You do not have sufficient permissions.";
            res.status(403);
            res.end();
            return;
        }
    } catch (err) {
        res.statusMessage = "An Error has occured fetching the registrations.";
        res.status(500);
        res.end();
    }
});
