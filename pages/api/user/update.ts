import authenticatedHandler from "@util/api/authenticatedHandler";
import { getAuth } from "firebase-admin/auth";

import { connectDB, User } from "@db/index";
import { Action, logAction } from "@util/logging";

export default authenticatedHandler().post(async (req, res) => {
    const data = req.body;
    const uid = req.uid;

    try {
        await connectDB();

        const user = await User.findOneAndUpdate(
            { authId: uid },
            { ...data }
        ).orFail();

        if (data.displayName) {
            const auth = getAuth();
            await auth.updateUser(uid, {
                displayName: data.displayName,
            });
        }
        res.status(200);

        if (user) {
            await logAction(user, Action.UPDATE_USER, "Updated own profile.");
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
