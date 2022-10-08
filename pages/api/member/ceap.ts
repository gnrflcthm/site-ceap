import { AccountType } from "@prisma/client";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { prisma } from "../../../prisma/db";

export default authenticatedHandler().post(async (req, res) => {
    try {
        if (req.role === AccountType.CEAP_SUPER_ADMIN) {
            const accounts = await prisma.user.findMany({
                where: {
                    accountType: {
                        in: [
                            AccountType.CEAP_ADMIN,
                            AccountType.CEAP_SUPER_ADMIN,
                        ],
                    },
                    AND: {
                        authId: {
                            not: req.uid,
                        },
                    },
                },
            });
            res.status(200).json(accounts);
        } else {
            res.statusMessage =
                "You do not have sufficient permissions to access this route.";
            res.status(401);
        }
    } catch (err) {
        console.log(err);
        res.statusMessage = "An Error has occured retrieving data.";
        res.status(500);
    }
    res.end();
});
