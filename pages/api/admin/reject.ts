import authenticatedHandler from "@util/api/authenticatedHandler";
import { sendRejectEmail } from "@util/email";
import { AccountType } from "@util/Enums";

import { connectDB, MSAdminRegistration } from "@db/index";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).post(async (req, res) => {
    const { id } = req.body;

    try {
        await connectDB();

        const rejectedUser = await MSAdminRegistration.findByIdAndDelete(id);

        if (rejectedUser) await sendRejectEmail(rejectedUser);

        res.statusMessage = "Successfully Removed User.";
        res.status(200);
    } catch (err) {
        console.log(err);
        res.statusMessage = "An Error has occured removing the user.";
        res.status(418);
    }
    res.end();
});
