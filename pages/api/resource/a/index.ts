import authenticatedHandler from "@util/api/authenticatedHandler";
import { connectDB, User, Resource } from "@db/index";

export default authenticatedHandler().get(async (req, res) => {
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

        const resources = await Resource.aggregate([
            {
                $match: {
                    uploadedBy: user._id,
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

        res.status(200).json(resources);
    } catch (error) {
        console.log(error);
        res.statusMessage = "Error in retrieving resources";
        res.status(500);
    }
    res.end();
});
