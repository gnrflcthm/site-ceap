import { connectDB, MemberSchool, User } from "@db/index";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { AccountType } from "@util/Enums";
import { SortOrder } from "mongoose";

export default authenticatedHandler([
    AccountType.MS_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).get(async (req, res) => {
    console.table(req.query);
    try {
        if (req.query) {
            const criteria = Object.keys(req.query)[0];

            let query = req.query[criteria];

            if (!query) {
                res.statusMessage = "Invalid Query";
                throw new Error("Invalid Query");
            }

            if (Array.isArray(query)) {
                query = query[0];
            }

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

            await connectDB();
            const user = await User.findOne({ authId: req.uid });
            query = query.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
            if (user?.accountType === AccountType.MS_ADMIN) {
                let users: any[] = [];
                switch (criteria) {
                    case "name":
                        users = await User.find({
                            $or: [
                                {
                                    firstName: {
                                        $regex: `.*${query}.*`,
                                        $options: "i",
                                    },
                                },
                                {
                                    lastName: {
                                        $regex: `.*${query}.*`,
                                        $options: "i",
                                    },
                                },
                            ],
                            memberSchool: user.memberSchool,
                            authId: {
                                $ne: req.uid,
                            },
                        })
                            .skip(30 * page)
                            .limit(30)
                            .sort({[sortKey]: sortDir as SortOrder});
                        break;
                    default:
                        users = await User.find({
                            [criteria]: {
                                $regex: `.*${query}.*`,
                                $options: "i",
                            },
                            memberSchool: user.memberSchool,
                            authId: {
                                $ne: req.uid,
                            },
                        })
                            .skip(30 * page)
                            .limit(30)
                            .sort({[sortKey]: sortDir as SortOrder});
                }
                res.status(200).json(users);
            } else {
                let users: any[] = [];
                switch (criteria) {
                    case "name":
                        users = await User.find({
                            $or: [
                                {
                                    firstName: {
                                        $regex: `.*${query}.*`,
                                        $options: "i",
                                    },
                                },
                                {
                                    lastName: {
                                        $regex: `.*${query}.*`,
                                        $options: "i",
                                    },
                                },
                            ],
                            accountType: [
                                AccountType.CEAP_ADMIN,
                                AccountType.CEAP_SUPER_ADMIN,
                                AccountType.MS_ADMIN,
                            ],
                            authId: {
                                $ne: req.uid,
                            },
                        })
                            .populate("memberSchool")
                            .skip(30 * page)
                            .limit(30)
                            .sort({[sortKey]: sortDir as SortOrder});
                        break;
                    case "accountType":
                        users = await User.find({
                            authId: {
                                $ne: req.uid,
                            },
                            accountType: query,
                        })
                            .populate("memberSchool")
                            .skip(30 * page)
                            .limit(30)
                            .sort({[sortKey]: sortDir as SortOrder});
                        break;
                    case "school":
                        const ms = await MemberSchool.find({
                            name: { $regex: `.*${query}.*`, $options: "i" },
                            isRegistered: true,
                        });

                        const ids = ms.map((m) => m.id);

                        users = await User.find({
                            memberSchool: ids,
                            accountType: [
                                AccountType.CEAP_ADMIN,
                                AccountType.CEAP_SUPER_ADMIN,
                                AccountType.MS_ADMIN,
                            ],
                        })
                            .populate("memberSchool")
                            .skip(30 * page)
                            .limit(30)
                            .sort({[sortKey]: sortDir as SortOrder});
                        break;
                    default:
                        users = await User.find({
                            [criteria]: {
                                $regex: `.*${query}.*`,
                                $options: "i",
                            },
                            accountType: [
                                AccountType.CEAP_ADMIN,
                                AccountType.CEAP_SUPER_ADMIN,
                                AccountType.MS_ADMIN,
                            ],
                        })
                            .populate("memberSchool")
                            .skip(30 * page)
                            .limit(30)
                            .sort({[sortKey]: sortDir as SortOrder});
                }

                res.status(200).json(users);
            }
        }
    } catch (err) {
        res.statusMessage = res.statusMessage || "Error in retrieving users.";
        res.status(400);
    }
    res.end();
});
