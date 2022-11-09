import authenticatedHandler from "@util/api/authenticatedHandler";
import { sendAdminRejectEmail } from "@util/email";
import { AccountType } from "@util/Enums";

import { connectDB, MSAdminRegistration, User, MemberSchool } from "@db/index";
import { Action, logAction } from "@util/logging";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).post(async (req, res) => {
    const { id } = req.body;

    try {
        await connectDB();

        const rejectedUser = await MSAdminRegistration.findByIdAndDelete(id);

        res.statusMessage = "Successfully Removed User.";
        res.status(200);

        const user = await User.findOne({ authId: req.uid });
        const ms = await MemberSchool.findById(rejectedUser?.memberSchool);
        if (user && ms) {
            if (rejectedUser) {
                await sendAdminRejectEmail(rejectedUser, ms.name);
            }
            await logAction(
                user,
                Action.REJECT_ADMIN_REGISTRATION,
                `Rejected Admin Registration from ${ms.name}`
            );
        }
    } catch (err) {
        console.log(err);
        res.statusMessage = "An Error has occured removing the user.";
        res.status(418);
    }
    res.end();
});
