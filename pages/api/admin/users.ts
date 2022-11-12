import { connectDB, MemberSchool, User } from "@db/index";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { AccountType } from "@util/Enums";
import { Query } from "mongoose";

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
                        });
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
                        });
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
                        }).populate("memberSchool");
                        break;
                    case "accountType":
                        users = await User.find({
                            authId: {
                                $ne: req.uid,
                            },
                            accountType: query,
                        }).populate("memberSchool");
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
                        }).populate("memberSchool");
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
                        }).populate("memberSchool");
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
