import authenticatedHandler from "@util/api/authenticatedHandler";
import { connectDB, User } from "@db/index";
import { AccountType } from "@util/Enums";
import { SortOrder } from "mongoose";

export default authenticatedHandler([
    AccountType.MS_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).get(async (req, res) => {
    try {
        await connectDB();

        const admin = await User.findOne({
            authId: req.uid,
        });

        let page: number = 0;

        if (req.query.p && !Array.isArray(req.query.p)) {
            try {
                let temp = parseInt(req.query.p) - 1;
                page = temp < 0 ? 0 : temp;
            } catch (err) {}
        }

        let sortKey: string = "_id";
        let sortDir: string = "desc";

        if (req.query.sortBy && !Array.isArray(req.query.sortBy)) {
            sortKey = req.query.sortBy;
            if (req.query.sortDir && !Array.isArray(req.query.sortDir)) {
                sortDir = req.query.sortDir;
            }
        }

        if (admin) {
            let admins = [];
            switch (admin.accountType) {
                case AccountType.MS_ADMIN:
                    admins = await User.find({
                        memberSchool: admin.memberSchool,
                        accountType: AccountType.MS_ADMIN,
                        authId: {
                            $ne: req.uid,
                        },
                    })
                        .skip(page * 30)
                        .limit(30)
                        .sort({ [sortKey]: sortDir as SortOrder });
                    break;
                case AccountType.CEAP_SUPER_ADMIN:
                    admins = await User.find({
                        accountType: AccountType.MS_ADMIN,
                    })
                        .populate("memberSchool", ["id", "name"])
                        .skip(page * 30)
                        .limit(30)
                        .sort({ [sortKey]: sortDir as SortOrder });
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
