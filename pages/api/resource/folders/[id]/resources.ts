import { connectDB, Resource, User } from "@db/index";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { AccountType, FileAccessibility, ResourceStatus } from "@util/Enums";

export default authenticatedHandler([], true).get(async (req, res) => {
    const { id } = req.query;

    await connectDB();
    if (req.isLoggedIn) {
        const user = await User.findOne({ authId: req.uid });
        const accessibility: FileAccessibility[] = [
            FileAccessibility.PUBLIC,
            FileAccessibility.PRIVATE,
        ];
        const status: ResourceStatus[] = [ResourceStatus.APPROVED];

        if (
            [AccountType.CEAP_ADMIN, AccountType.CEAP_SUPER_ADMIN].includes(
                user?.accountType || AccountType.MS_USER
            )
        ) {
            accessibility.push(FileAccessibility.HIDDEN);
            status.push(ResourceStatus.ARCHIVED);
        }

        const resources = await Resource.find({
            folder: id,
            accessibility,
            status,
        })
            .populate("uploadedBy", ["id", "firstName", "lastName"])
            .populate("memberSchool", ["id", "name"]);
        res.status(200).json(resources.map((resource) => resource.toJSON()));
    } else {
        const resources = await Resource.find({
            folder: id,
            accessibility: FileAccessibility.PUBLIC,
            status: ResourceStatus.APPROVED,
        })
            .populate("uploadedBy", ["id", "firstName", "lastName"])
            .populate("memberSchool", ["id", "name"]);
        res.status(200).json(resources.map((resource) => resource.toJSON()));
    }
});
