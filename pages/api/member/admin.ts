import authenticatedHandler from "@util/api/authenticatedHandler";
import { connectDB, User } from "@db/index";
import { AccountType } from "@util/Enums";

export default authenticatedHandler([
    AccountType.MS_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).get(async (req, res) => {
    try {
        await connectDB();

        const user = await User.findOne({
            authId: req.uid,
        }).orFail();

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

        const admins = await User.aggregate([
            ...(user.accountType === AccountType.CEAP_SUPER_ADMIN
                ? [
                      {
                          $lookup: {
                              from: "MemberSchool",
                              localField: "memberSchool",
                              foreignField: "_id",
                              as: "memberSchool",
                          },
                      },
                      {
                          $unwind: {
                              path: "$memberSchool",
                              includeArrayIndex: "0",
                              preserveNullAndEmptyArrays: true,
                          },
                      },
                  ]
                : []),
            {
                $match: {
                    $and: [
                        {
                            accountType: AccountType.MS_ADMIN,
                        },
                        ...(user.accountType === AccountType.MS_ADMIN
                            ? [{ "memberSchool._id": user.memberSchool }]
                            : []),
                    ],
                    _id: { $ne: user._id },
                },
            },
            {
                $sort: {
                    [sortKey]: sortDir === "desc" ? -1 : 1,
                },
            },
            {
                $skip: 30 * page,
            },
            {
                $limit: 30,
            },
        ]);

        res.status(200).json(admins);
    } catch (err) {
        console.log(err);
        res.statusMessage = "An error has occured while retrieving data.";
        res.status(500);
    }

    res.end();
});
