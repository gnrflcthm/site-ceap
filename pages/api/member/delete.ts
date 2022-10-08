import axios from "axios";
import { AccountType } from "@prisma/client";
import authenticatedHandler from "@util/api/authenticatedHandler";

import "../../../firebase/admin";
import { getAuth } from "firebase-admin/auth";

import { prisma } from "prisma/db";

export default authenticatedHandler([
    AccountType.CEAP_SUPER_ADMIN,
    AccountType.MS_ADMIN,
]).post(async (req, res) => {
    const { id } = req.body;
    const auth = getAuth();

    try {
        const deletedUser = await prisma.user.delete({
            where: { id },
        });

        if (deletedUser) {
            await auth.deleteUser(deletedUser.authId);
        }

        res.status(200);
    } catch (err) {
        console.log(err);
        res.statusMessage = "Error in deleting user.";
        res.status(418);
    }
    res.end();
});
