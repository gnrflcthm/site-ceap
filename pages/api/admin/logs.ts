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

        let sortKey: string = "_id";
        let sortDir: string = "desc";

        if (req.query.sortBy && !Array.isArray(req.query.sortBy)) {
            sortKey = req.query.sortBy;
            if (req.query.sortDir && !Array.isArray(req.query.sortDir)) {
                sortDir = req.query.sortDir;
            }
        }
        const criteria = Object.keys(req.query)[0];

        let query = req.query[criteria];

        if (Array.isArray(query)) {
            query = query[0];
        }

        let logs: (ILogSchema & { user?: any })[] = [];

        const roles: AccountType[] = [AccountType.MS_USER];

        switch (user.accountType) {
            case AccountType.CEAP_SUPER_ADMIN:
                roles.push(AccountType.CEAP_SUPER_ADMIN);
            case AccountType.CEAP_ADMIN:
                roles.push(AccountType.CEAP_ADMIN);
            case AccountType.MS_ADMIN:
                roles.push(AccountType.MS_ADMIN);
        }

        logs = await Log.aggregate([
            {
                $lookup: {
                    from: "User",
                    localField: "user",
                    foreignField: "_id",
                    as: "user",
                },
            },
            {
                $unwind: {
                    path: "$user",
                    includeArrayIndex: "0",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $match: {
                    ...(["name", "action", "details"].includes(criteria)
                        ? criteria === "name"
                            ? {
                                  "user.displayName": {
                                      $regex: `.*${query}.*`,
                                      $options: "i",
                                  },
                              }
                            : {
                                  [criteria]: {
                                      $regex: `.*${query}.*`,
                                      $options: "i",
                                  },
                              }
                        : {}),
                    ...(!roles.includes(AccountType.CEAP_ADMIN)
                        ? {
                              memberSchool: user.memberSchool,
                          }
                        : { "user.accountType": { $in: roles } }),
                },
            },
            {
                $sort: {
                    [sortKey === "name" ? "user.displayName" : sortKey]:
                        sortDir === "desc" ? -1 : 1,
                },
            },
            {
                $skip: 30 * page,
            },
            {
                $limit: 30,
            },
        ]);
        res.status(200).json(logs);
    } catch (err) {
        console.log(err);
        res.statusMessage = "Error in retrieving logs.";
        res.status(400);
    }
    res.end();
});
