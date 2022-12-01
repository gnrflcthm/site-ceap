import { connectDB, User } from "@db/index";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { AccountType } from "@util/Enums";

export default authenticatedHandler([
    AccountType.MS_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).get(async (req, res) => {
    try {
        let query: string | undefined = undefined;

        if (req.query.q && !Array.isArray(req.query.q)) {
            query = req.query.q;
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
        const user = await User.findOne({ authId: req.uid }).orFail();

        query = query && query.trim().replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

        const fields = [
            "firstName",
            "lastName",
            "email",
            "mobileNumber",
            "memberSchool.name",
            "accountType",
        ];

        const users = await User.aggregate([
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
            {
                $match: {
                    $and: [
                        ...(query
                            ? [
                                  {
                                      $or: fields.map((field) => ({
                                          [field]: {
                                              $regex: `.*${query}.*`,
                                              $options: "i",
                                          },
                                      })),
                                  },
                              ]
                            : []),
                        ...(user?.accountType === AccountType.MS_ADMIN
                            ? [
                                  {
                                      "memberSchool._id": user.memberSchool,
                                      accountType: {
                                          $in: [
                                              AccountType.MS_ADMIN,
                                              AccountType.MS_USER,
                                          ],
                                      },
                                  },
                              ]
                            : [
                                  {
                                      accountType: {
                                          $in: [
                                              AccountType.CEAP_ADMIN,
                                              AccountType.CEAP_SUPER_ADMIN,
                                              AccountType.MS_ADMIN,
                                          ],
                                      },
                                  },
                              ]),
                        {
                            _id: { $ne: user._id },
                        },
                    ],
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
        res.status(200).json(users);
    } catch (err) {
        res.statusMessage = res.statusMessage || "Error in retrieving users.";
        res.status(400);
    }
    res.end();
});
