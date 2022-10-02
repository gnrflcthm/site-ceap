import { AccountType } from "@prisma/client";
import authenticatedHandler from "@util/api/authenticatedHandler";

import { prisma } from "prisma/db";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).post(async (req, res) => {
    const { id } = req.body;

    try {
        await prisma.mSAdminRegistration.delete({
            where: {
                id,
            },
        });
        res.statusMessage = "Successfully Removed User.";
        res.status(200);
    } catch (err) {
        console.log(err);
        res.statusMessage = "An Error has occured removing the user.";
        res.status(418);
    }
    res.end();
});
