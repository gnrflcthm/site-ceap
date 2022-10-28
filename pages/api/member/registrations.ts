import authenticatedHandler from "@util/api/authenticatedHandler";

import {
    connectDB,
    MSAdminRegistration,
    User,
    UserRegistration,
} from "@db/index";
import { AccountType } from "@util/Enums";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
    AccountType.MS_ADMIN,
]).post(async (req, res) => {
    const { uid } = req;
    try {
        await connectDB();

        const admin = await User.findOne({ authId: uid });

        let registrations;

        if (admin) {
            switch (admin.accountType) {
                case AccountType.CEAP_ADMIN:
                case AccountType.CEAP_SUPER_ADMIN:
                    registrations = await MSAdminRegistration.find().populate(
                        "memberSchool",
                        ["id", "name"]
                    );
                    break;
                case AccountType.MS_ADMIN:
                    registrations = await UserRegistration.find({
                        memberSchool: admin?.memberSchool,
                    });
                    break;
                default:
                    res.statusMessage =
                        "You do not have sufficient permissions.";
                    res.status(403);
                    res.end();
                    return;
            }
            res.status(200).json(registrations);
            res.end();
        } else {
            res.statusMessage = "You do not have sufficient permissions.";
            res.status(403);
            res.end();
            return;
        }
    } catch (err) {
        res.statusMessage = "An Error has occured fetching the registrations.";
        res.status(500);
        res.end();
    }
});
