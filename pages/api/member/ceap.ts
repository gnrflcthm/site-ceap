import authenticatedHandler from "@util/api/authenticatedHandler";
import { connectDB, User } from "@db/index";
import { AccountType } from "@util/Enums";
import { SortOrder } from "mongoose";

export default authenticatedHandler([AccountType.CEAP_SUPER_ADMIN]).get(
    async (req, res) => {
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
            // const accounts = await User.find({
            //     accountType: [
            //         AccountType.CEAP_ADMIN,
            //         AccountType.CEAP_SUPER_ADMIN,
            //     ],
            //     authId: {
            //         $ne: req.uid,
            //     },
            // }).skip(page * 30).limit(30).sort({[sortKey]: sortDir as SortOrder});

            const accounts = await User.aggregate([
                {
                    $match: {
                        accountType: {
                            $in: [
                                AccountType.CEAP_ADMIN,
                                AccountType.CEAP_SUPER_ADMIN,
                            ],
                        },
                        authId: { $ne: req.uid },
                    },
                },
                {
                    $skip: page * 30,
                },
                {
                    $limit: 30,
                },
                {
                    $sort: { [sortKey]: sortDir === "desc" ? -1 : 1 },
                },
            ]);
            res.status(200).json(accounts);
        } catch (err) {
            console.log(err);
            res.statusMessage = "An Error has occured retrieving data.";
            res.status(500);
        }
        res.end();
    }
);
