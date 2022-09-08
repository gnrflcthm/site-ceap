import authenticatedHandler from "@util/api/authenticatedHandler";

import { getAuth } from "firebase-admin/auth";

import { prisma } from "../../../prisma/db";
import { AccountType } from "@prisma/client";

export default authenticatedHandler().post(async (req, res) => {
    const { id } = req.body;

    const auth = getAuth();

    if (!id) {
        res.status(418).json({ msg: "Missing requried fields." });
        res.end();
        return;
    }

    const user = await prisma.userRegistration.findFirst({
        where: {
            id,
        },
    });

    if (!user) {
        res.status(418).json({ msg: "User does not exist." });
        res.end();
        return;
    }
    
    // TODO: Fix Model Field Name Inconsistencies

    try {
        const { uid, displayName } = await auth.createUser({
            displayName: `${user?.firstName} ${user?.lastName}`,
            email: user?.email,
            password: "hatdog",
        });

        await auth.setCustomUserClaims(uid, {
            role: AccountType.MS_USER,
        });

        const { firstName, lastName, email, memberSchoolId, mobileNumber, middleName, birthday } = user;

        await prisma.user.create({
            data: {
                ...{email: email, firstName, lastName, middleName, memberSchoolId, mobileNumber},
                authId: uid,
                accountType: AccountType.MS_USER,
                username: displayName || ""
            }
        })

        res.status(200).json({ msg: "User successfully created." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error in adding user." });
        res.end();
        return;
    }
});
