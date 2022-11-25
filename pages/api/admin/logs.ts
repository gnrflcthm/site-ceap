import { ILogSchema } from "@db/models/Log";
import { connectDB } from "@db/index";
import { Log, User } from "@db/models";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { AccountType } from "@util/Enums";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
    AccountType.MS_ADMIN,
]).get(async (req, res) => {
    try {
        await connectDB();
        const user = await User.findOne({ authId: req.uid }).orFail();

        let page: number = 0;

        if (req.query.p && !Array.isArray(req.query.p)) {
            try {
                let temp = parseInt(req.query.p) - 1;
                page = temp < 0 ? 0 : temp;
            } catch (err) {}
        }

        if (req.query) {
            const criteria = Object.keys(req.query)[0];

            let query = req.query[criteria];

            if (Array.isArray(query)) {
                query = query[0];
            }

            let logs: (ILogSchema & { user?: any })[] = [];
            const isAdministrative = [
                AccountType.CEAP_ADMIN,
                AccountType.CEAP_SUPER_ADMIN,
            ].includes(req.role);
            switch (criteria) {
                case "name":
                    let users = await User.find({
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
                    });

                    const ids = users.map((u) => u.id);

                    if (isAdministrative) {
                        logs = await Log.find({ user: ids })
                            .populate("user")
                            .skip(page * 30)
                            .limit(30)
                            .sort({ datePerformed: -1 });
                    } else {
                        logs = await Log.find({
                            user: ids,
                            memberSchool: user.memberSchool,
                        })
                            .populate("user")
                            .skip(page * 30)
                            .limit(30)
                            .sort({ datePerformed: -1 });
                    }
                    break;
                default:
                    if (isAdministrative) {
                        logs = await Log.find({
                            [criteria]: {
                                $regex: `.*${query}.*`,
                                $options: "i",
                            },
                        })
                            .populate("user")
                            .skip(page * 30)
                            .limit(30)
                            .sort({ datePerformed: -1 });
                    } else {
                        logs = await Log.find({
                            [criteria]: {
                                $regex: `.*${query}.*`,
                                $options: "i",
                            },
                            memberSchool: user.memberSchool,
                        })
                            .populate("user")
                            .skip(page * 30)
                            .limit(30)
                            .sort({ datePerformed: -1 });
                    }
            }
            res.status(200).json(logs);
        } else {
            let logs: (ILogSchema & { user?: any })[] = [];
            switch (user.accountType) {
                case AccountType.CEAP_ADMIN:
                case AccountType.CEAP_SUPER_ADMIN:
                    logs = await Log.find({})
                        .populate("user")
                        .skip(page * 30)
                        .limit(30)
                        .sort({ datePerformed: -1 });
                    break;
                case AccountType.MS_ADMIN:
                    logs = await Log.find({
                        memberSchool: user.memberSchool,
                    })
                        .populate("user")
                        .skip(page * 30)
                        .limit(30)
                        .sort({ datePerformed: -1 });
            }
            res.status(200).json(logs);
        }
    } catch (err) {
        console.log(err);
        res.statusMessage = "Error in retrieving logs.";
        res.status(400);
    }
    res.end();
});
