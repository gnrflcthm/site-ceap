import { User } from "@prisma/client";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { prisma } from "prisma/db";
import { getAuth } from "firebase-admin/auth";

export default authenticatedHandler().post(async (req, res) => {
    const data: User = req.body;
    const uid = req.uid;

    try {
        await prisma.user.update({
            where: {
                authId: uid,
            },
            data,
        });

        if (data.displayName) {
            const auth = getAuth();
            await auth.updateUser(uid, {
                displayName: data.displayName,
            });
        }
    } catch (err) {
        console.log(err);
        res.statusMessage =
            "An error has occured while updating user info. Please try again later.";
        res.status(500);
        res.end();
        return;
    }

    res.statusMessage = "Sucessfully Updated User Info";
    res.status(200);
    res.end();
});
