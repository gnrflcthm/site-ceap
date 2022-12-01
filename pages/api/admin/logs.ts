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

        let query: string | undefined = undefined;

        if (req.query.q && !Array.isArray(req.query.q)) {
            query = req.query.q;
        }

        query = query && query.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

        if (Array.isArray(query)) {
            query = query[0];
        }

        const roles: AccountType[] = [AccountType.MS_USER];

        switch (user.accountType) {
            case AccountType.CEAP_SUPER_ADMIN:
                roles.push(AccountType.CEAP_SUPER_ADMIN);
            case AccountType.CEAP_ADMIN:
                roles.push(AccountType.CEAP_ADMIN);
            case AccountType.MS_ADMIN:
                roles.push(AccountType.MS_ADMIN);
        }

        const fields = ["user.displayName", "action", "details"];
        
        const logs = await Log.aggregate([
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
                    ...(query
                        ? {
                              $or: fields.map((field) => ({
                                  [field]: {
                                      $regex: `.*${query}.*`,
                                      $options: "i",
                                  },
                              })),
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
