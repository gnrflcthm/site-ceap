import authenticatedHandler from "@util/api/authenticatedHandler";
import { connectDB, User, Resource } from "@db/index";

export default authenticatedHandler().get(async (req, res) => {
    await connectDB();

    const user = await User.findOne({ authId: req.uid });

    if (!user) {
        res.statusMessage = "User Does Not Exist";
        res.status(401);
        res.end();
        return;
    }

    try {
        const resources = await Resource.find({ uploadedBy: user.id })
            .populate("uploadedBy", ["id", "displayName"])
            .exec();
        res.status(200).json(
            resources.map((resource) => ({
                ...resource.toJSON(),
                dateAdded: resource.dateAdded.toDateString(),
            }))
        );
    } catch (error) {
        res.statusMessage = "Error in retrieving resources";
        res.status(500);
    }
    res.end();
});
