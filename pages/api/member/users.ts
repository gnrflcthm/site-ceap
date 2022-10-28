import authenticatedHandler from "@util/api/authenticatedHandler";

import { connectDB, User } from "@db/index";
import { AccountType } from "@util/Enums";

export default authenticatedHandler([AccountType.MS_ADMIN]).post(
    async (req, res) => {
        const uid = req.uid;
        try {
            await connectDB();

            const admin = await User.findOne({
                authId: uid,
            }).populate("memberSchool", ["id"]);

            if (admin) {
                const accounts = await User.find({
                    memberSchool: admin.memberSchool,
                    accountType: AccountType.MS_USER,
                });

                res.status(200).json(accounts);
            }
        } catch (error) {
            res.statusMessage =
                "An error has occured while retrieving the data.";
            res.status(418);
        }
        res.end();
    }
);
