import authenticatedHandler from "@util/api/authenticatedHandler";

import {
    connectDB,
    MSAdminRegistration,
    User,
    UserRegistration,
} from "@db/index";
import { AccountType } from "@util/Enums";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
    AccountType.MS_ADMIN,
]).get(async (req, res) => {
    const { uid } = req;
    try {
        await connectDB();

        let page: number = 0;

        if (req.query && req.query.p && !Array.isArray(req.query.p)) {
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

        const user = await User.findOne({ authId: uid }).orFail();

        let registrations: any[] | undefined = undefined;
        switch (user.accountType) {
            case AccountType.CEAP_SUPER_ADMIN:
            case AccountType.CEAP_ADMIN:
                registrations = await MSAdminRegistration.aggregate([
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
                        $sort: {
                            [sortKey]:
                                sortDir === "desc" ? -1 : 1,
                        },
                    },
                    {
                        $skip: page * 30,
                    },
                    {
                        $limit: 30,
                    },
                ]);
                break;
            case AccountType.MS_ADMIN:
                registrations = await UserRegistration.aggregate([
                    {
                        $match: {
                            memberSchool: user.memberSchool,
                        },
                    },
                    {
                        $sort: {
                            [sortKey]:
                                sortDir === "desc" ? -1 : 1,
                        },
                    },
                    {
                        $skip: page * 30,
                    },
                    {
                        $limit: 30,
                    },
                ]);
        }

        res.status(200).json(registrations || []);
    } catch (err) {
        res.statusMessage = "An Error has occured fetching the registrations.";
        res.status(500);
        res.end();
    }
});
