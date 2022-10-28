import authenticatedHandler from "@util/api/authenticatedHandler";

import { connectDB, User } from "@db/index";

export default authenticatedHandler().post(async (req, res) => {
    const uid = req.uid;

    await connectDB();

    const user = await User.findOne().where("authId", uid);

    res.statusMessage = "You Are Currently Logged In.";
    res.status(200).json({
        uid,
        displayName: user?.displayName,
        role: user?.accountType || "",
    });

    res.end();
});
