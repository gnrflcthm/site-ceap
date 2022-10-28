import authenticatedHandler from "@util/api/authenticatedHandler";
import { getAuth } from "firebase-admin/auth";

import { connectDB, User } from "@db/index";

export default authenticatedHandler().post(async (req, res) => {
    const data = req.body;
    const uid = req.uid;

    try {
        await connectDB();

        await User.findOneAndUpdate({ authId: uid }, { ...data });

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
