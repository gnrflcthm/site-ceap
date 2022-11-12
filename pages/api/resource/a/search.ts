import { connectDB } from "@db/index";
import { Resource, User } from "@db/models";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { AccountType, FileAccessibility, ResourceStatus } from "@util/Enums";

export default authenticatedHandler(undefined, true).get(async (req, res) => {
    const { q } = req.query;

    console.log(q);

    const status = [ResourceStatus.APPROVED];
    const accessibility = [FileAccessibility.PUBLIC];

    try {
        if (req.uid) {
            const user = await User.findOne({ authId: req.uid });

            switch (user?.accountType) {
                case AccountType.CEAP_SUPER_ADMIN:
                case AccountType.CEAP_ADMIN:
                    accessibility.push(FileAccessibility.HIDDEN);
                    status.push(ResourceStatus.ARCHIVED);
                default:
                    accessibility.push(FileAccessibility.PRIVATE);
            }
        }

        await connectDB();
        const resources = await Resource.find({
            filename: { $regex: `.*${q}.*`, $options: "i" },
            status,
            accessibility,
        })
            .populate("uploadedBy")
            .populate("memberSchool");

        res.status(200).json(resources);
    } catch (err) {
        console.log(err);
        res.statusMessage = "Error in retrieving resources.";
        res.status(400);
    }
    res.end();
});
