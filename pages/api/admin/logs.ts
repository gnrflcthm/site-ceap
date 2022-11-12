import { IUserSchema } from "./../../../db/models/User";
import { ILogSchema } from "./../../../db/models/Log";
import { connectDB } from "@db/index";
import { IResourceSchema, Log, User } from "@db/models";
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

        if (req.query) {
            const criteria = Object.keys(req.query)[0];

            let query = req.query[criteria];

            if (Array.isArray(query)) {
                query = query[0];
            }

            let logs: (ILogSchema & { user?: IResourceSchema })[] = [];
            switch (criteria) {
                case "name":
                    const users = await User.find({
                        $or: [
                            {
                                firstName: {
                                    $regex: `.*${query}.*`,
                                    $options: "i",
                                },
                            },
                            {
                                lastName: {
                                    $regex: `.*${query}.*`,
                                    $options: "i",
                                },
                            },
                        ],
                    });

                    const ids = users.map((u) => u.id);

                    logs = await Log.find({ user: ids }).populate("user");
                    break;
                default:
                    logs = await Log.find({
                        [criteria]: { $regex: `.*${query}.*`, $options: "i" },
                    }).populate("user");
            }
            res.status(200).json(logs);
        } else {
            let logs: (ILogSchema & { user?: IUserSchema })[] = [];
            switch (user.accountType) {
                case AccountType.CEAP_ADMIN:
                case AccountType.CEAP_SUPER_ADMIN:
                    logs = await Log.find({}).populate("user");
                    break;
                case AccountType.MS_ADMIN:
                    logs = await Log.find({
                        memberSchool: user.memberSchool,
                    }).populate("user");
            }
            res.status(200).json(logs);
        }
    } catch (err) {
        console.log(err);
        res.statusMessage = "Error in retrieving logs.";
        res.status(400);
    }
    res.end();
});
