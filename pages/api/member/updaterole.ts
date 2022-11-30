import { connectDB, User } from "@db/index";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { AccountType } from "@util/Enums";
import { Action, logAction } from "@util/logging";

import { getAuth } from "firebase-admin/auth";
import "../../../firebase/index";

export default authenticatedHandler([
    AccountType.CEAP_SUPER_ADMIN,
    AccountType.MS_ADMIN,
]).post(async (req, res) => {
    const { id } = req.body;

    try {
        await connectDB();
        const admin = await User.findOne({ authId: req.uid }).orFail();
        const user = await User.findById(id).orFail();

        let accountType: AccountType = user.accountType;
        let action: "Promoted" | "Demoted" = "Demoted";

        switch (accountType) {
            case AccountType.CEAP_ADMIN:
                accountType = AccountType.CEAP_SUPER_ADMIN;
                action = "Promoted";
                break;
            case AccountType.CEAP_SUPER_ADMIN:
                accountType = AccountType.CEAP_ADMIN;
                action = "Demoted";
                break;
            case AccountType.MS_ADMIN:
                accountType = AccountType.MS_USER;
                action = "Demoted";
                break;
            case AccountType.MS_USER:
                accountType = AccountType.MS_ADMIN;
                action = "Promoted";
                break;
        }

        if (user?.accountType === AccountType.MS_ADMIN) {
            const adminCount = await User.count({
                memberSchool: user.memberSchool,
                accountType: AccountType.MS_ADMIN,
            });

            if (adminCount === 1) {
                res.statusMessage = "Cannot demote the only admin.";
                res.status(400);
                throw new Error("Cannot demote the only admin.");
            }
        }

        user.accountType = accountType;
        await user.save();

        const auth = getAuth();

        await auth.setCustomUserClaims(user.authId, { role: accountType });

        res.status(200).json({ action });

        await logAction(
            admin,
            Action.UPDATE_USER,
            `${action} user. (${user.displayName})`
        );
    } catch (err) {
        console.log(err);
        res.statusMessage = res.statusMessage || "Error in updating account type";
        res.status(400);
    }
    res.end();
});
