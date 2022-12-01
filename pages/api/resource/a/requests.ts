import authenticatedHandler from "@util/api/authenticatedHandler";

import { connectDB, Folder, Resource, User } from "@db/index";
import { AccountType, ResourceStatus } from "@util/Enums";

export default authenticatedHandler([
    AccountType.MS_ADMIN,
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).get(async (req, res) => {
    await connectDB();

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

    try {
        const user = await User.findOne({ authId: req.uid }).orFail();

        const uploads = await Resource.aggregate([
            {
                $lookup: {
                    from: "User",
                    localField: "uploadedBy",
                    foreignField: "_id",
                    as: "uploadedBy",
                },
            },
            {
                $unwind: {
                    path: "$uploadedBy",
                    includeArrayIndex: "0",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $match: {
                    ...([
                        AccountType.CEAP_ADMIN,
                        AccountType.CEAP_SUPER_ADMIN,
                    ].includes(user.accountType)
                        ? { status: ResourceStatus.FOR_CEAP_REVIEW }
                        : {
                              status: ResourceStatus.FOR_ADMIN_REVIEW,
                              "uploadedBy.memberSchool": user.memberSchool,
                          }),
                },
            },
            {
                $addFields: {
                    fname: { $toLower: "$filename" },
                },
            },
            {
                $sort: {
                    [sortKey === "filename" ? "fname" : sortKey]:
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

        res.status(200).json(uploads);
    } catch (error) {
        console.log(error);
        res.statusMessage = "Error in retrieving Upload Requests.";
        res.status(500);
    }
    res.end();
});
