import authenticatedHandler from "@util/api/authenticatedHandler";

import "../../../firebase/admin";
import { getAuth } from "firebase-admin/auth";

import { connectDB, User } from "@db/index";
import { AccountType } from "@util/Enums";

export default authenticatedHandler([
    AccountType.CEAP_SUPER_ADMIN,
    AccountType.MS_ADMIN,
]).post(async (req, res) => {
    const { id } = req.body;
    const auth = getAuth();

    await connectDB();

    try {
        const findUser = await User.findById(id);

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

        const deletedUser = await User.findByIdAndDelete(id);

        if (deletedUser) {
            await auth.deleteUser(deletedUser.authId);
        }

        res.status(200);
    } catch (err) {
        console.log(err);
        res.statusMessage = res.statusMessage || "Error in Deleteing User.";
        res.status(418);
    }
    res.end();
});
