import authenticatedHandler from "@util/api/authenticatedHandler";

import { connectDB, User } from "@db/index";
import { AccountType } from "@util/Enums";
import { SortOrder } from "mongoose";

export default authenticatedHandler([AccountType.MS_ADMIN]).get(
    async (req, res) => {
        const uid = req.uid;

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
            await connectDB();
            const admin = await User.findOne({
                authId: uid,
            }).orFail();
            
            const users = await User.aggregate([
                {
                    $match: {
                        memberSchool: admin?.memberSchool,
                        accountType: AccountType.MS_USER,
                    },
                },
                {
                    $sort: { [sortKey]: sortDir === "desc" ? -1 : 1 },
                },
                {
                    $skip: page * 30,
                },
                {
                    $limit: 30,
                },
            ]);

            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.statusMessage =
                "An error has occured while retrieving the data.";
            res.status(418);
        }
        res.end();
    }
);
