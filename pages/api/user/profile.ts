import authenticatedHandler from "@util/api/authenticatedHandler";
import { connectDB, User } from "@db/index";

export default authenticatedHandler().get(async ({ uid }, res) => {
    await connectDB();

    const userInfo = await User.findOne({
        authId: uid,
    })
        .populate("memberSchool", ["id", "name"])
        .exec();

    if (userInfo) {
        res.status(200).json(userInfo);
    } else {
        res.statusMessage = "User Info Not Found";
        res.status(404);
    }
    res.end();
});
