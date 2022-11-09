import { connectDB, User } from "@db/index";
import authenticatedHandler from "@util/api/authenticatedHandler";

export default authenticatedHandler().get(async (req, res) => {
    const { id } = req.query;

    try {
        await connectDB();
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.statusMessage = "Error in retrieving user";
        res.status(400);
    }
    res.end();
});
