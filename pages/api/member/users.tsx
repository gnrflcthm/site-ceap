import { AccountType } from "@prisma/client";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { prisma } from "../../../prisma/db";

export default authenticatedHandler().post(async (req, res) => {
    const uid = req.uid;
    try {
        let admin = await prisma.user.findFirst({
            where: {
                authId: req.uid,
            },
        });
        let accounts;
        if (admin) {
            switch (req.role) {
                case AccountType.CEAP_SUPER_ADMIN:
                    accounts = await prisma.user.findMany({
                        where: {
                            accountType: {
                                in: [
                                    AccountType.CEAP_ADMIN,
                                    AccountType.CEAP_SUPER_ADMIN,
                                    AccountType.MS_ADMIN,
                                ],
                            },
                            AND: {
                                authId: {
                                    not: uid,
                                },
                            },
                        },
                        include: {
                            memberSchool: true,
                        },
                    });
                    break;
                case AccountType.CEAP_ADMIN:
                    accounts = await prisma.user.findMany({
                        where: {
                            accountType: AccountType.MS_ADMIN,
                            AND: {
                                authId: {
                                    not: uid,
                                },
                            },
                        },
                        include: {
                            memberSchool: true,
                        },
                    });
                    break;
                case AccountType.MS_ADMIN:
                    accounts = await prisma.user.findMany({
                        where: {
                            memberSchoolId: admin.memberSchoolId,
                            AND: {
                                authId: {
                                    not: uid,
                                },
                            },
                        },
                    });
                    break;
            }
        }
        res.status(200).json(accounts);
    } catch (error) {
        res.statusMessage = "An error has occured while retrieving the data.";
        res.status(418);
    }
    res.end();
});
