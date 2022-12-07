import authenticatedHandler from "@util/api/authenticatedHandler";
import { AccountType, ResourceStatus } from "@util/Enums";
import { Resource, connectDB } from "@db/index";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).get(async (req, res) => {
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

    try {
        await connectDB();
        const fields = ["filename", "fileType", "uploadedBy.displayName"];
        const archivedResources = await Resource.aggregate([
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
                    status: ResourceStatus.ARCHIVED
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
        
        res.status(200).json(archivedResources);
    } catch (err) {
        console.log(err);
        res.statusMessage = "Error in retrieving logs.";
        res.status(400);
    }
    res.end();
});
