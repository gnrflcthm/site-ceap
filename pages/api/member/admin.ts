import authenticatedHandler from "@util/api/authenticatedHandler";
import { connectDB, User } from "@db/index";
import { AccountType } from "@util/Enums";

export default authenticatedHandler([
    AccountType.MS_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).post(async (req, res) => {
    try {
        await connectDB();

        const admin = await User.findOne({
            authId: req.uid,
        });

        if (admin) {
            let admins = [];
            switch (admin.accountType) {
                case AccountType.MS_ADMIN:
                    admins = await User.find({
                        memberSchool: admin.memberSchool,
                        accountType: AccountType.MS_ADMIN,
                        authId: {
                            $ne: req.uid
                        }
                    });
                    break;
                case AccountType.CEAP_SUPER_ADMIN:
                    admins = await User.find({
                        accountType: AccountType.MS_ADMIN,
                    })
                        .populate("memberSchool", ["id", "name"])
                        .exec();
                    break;
                default:
                    res.statusMessage =
                        "You do not have sufficient permissions to access this route.";
                    res.status(401);
                    res.end();
                    return;
            }
            res.status(200).json(admins);
        }
    } catch (err) {
        console.log(err);
        res.statusMessage = "An error has occured while retrieving data.";
        res.status(500);
    }

    res.end();
});
