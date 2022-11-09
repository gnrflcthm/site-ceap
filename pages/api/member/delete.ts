import authenticatedHandler from "@util/api/authenticatedHandler";

import "../../../firebase/admin";
import { getAuth } from "firebase-admin/auth";

import { connectDB, MemberSchool, User } from "@db/index";
import { AccountType } from "@util/Enums";
import { logAction, Action } from "@util/logging";
import { getAccountType } from "@util/functions";
import { sendDeletedAccountNotif } from "@util/email";

export default authenticatedHandler([
    AccountType.CEAP_SUPER_ADMIN,
    AccountType.MS_ADMIN,
]).post(async (req, res) => {
    const { id } = req.body;
    const auth = getAuth();

    await connectDB();

    try {
        const findUser = await User.findById(id);

        if (findUser) {
            if (findUser?.accountType === AccountType.MS_ADMIN) {
                const adminCount = await User.count({
                    memberSchool: findUser.memberSchool,
                    accountType: AccountType.MS_ADMIN,
                });

                if (adminCount === 1) {
                    res.statusMessage = "Cannot delete the only admin.";
                    res.status(400);
                    throw new Error("Cannot delete the only admin.");
                }
            }
            await findUser.delete();
            await auth.deleteUser(findUser.authId);
            res.status(200);

            const a = await User.findOne({ authId: req.uid });
            const ms = await MemberSchool.findById(findUser.memberSchool);
            if (a) {
                await logAction(
                    a,
                    Action.DELETE_ACCOUNT,
                    `Deleted an account. (${
                        findUser.displayName
                    } - ${getAccountType(findUser.accountType)})`
                );
                await sendDeletedAccountNotif(
                    findUser,
                    ms?.name || undefined,
                    [
                        AccountType.CEAP_ADMIN,
                        AccountType.CEAP_SUPER_ADMIN,
                    ].includes(findUser.accountType)
                );
            }
        }
    } catch (err) {
        console.log(err);
        res.statusMessage = res.statusMessage || "Error in Deleteing User.";
        res.status(418);
    }
    res.end();
});
