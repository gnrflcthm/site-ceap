import { connectDB, Resource, User } from "@db/index";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { AccountType, FileAccessibility } from "@util/Enums";

export default authenticatedHandler([], true).get(async (req, res) => {
    const { id } = req.query;

    await connectDB();
    if (req.isLoggedIn) {
        const user = await User.findOne({ authId: req.uid });
        let accessibility = [
            FileAccessibility.PUBLIC,
            FileAccessibility.PRIVATE,
        ];
        if (
            [AccountType.CEAP_ADMIN, AccountType.CEAP_SUPER_ADMIN].includes(
                user?.accountType || AccountType.MS_USER
            )
        ) {
            accessibility.push(FileAccessibility.HIDDEN);
        }

        const resources = await Resource.find({ folder: id, accessibility });
        res.status(200).json(resources.map((resource) => resource.toJSON()));
    } else {
        const resources = await Resource.find({
            folder: id,
            accessibility: FileAccessibility.PUBLIC,
        });
        res.status(200).json(resources.map((resource) => resource.toJSON()));
    }
});
