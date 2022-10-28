import authenticatedHandler from "@util/api/authenticatedHandler";

import { sendRejectEmail } from "@util/email";
import { connectDB, UserRegistration } from "@db/index";
import { AccountType } from "@util/Enums";

export default authenticatedHandler([AccountType.MS_ADMIN]).post(
    async (req, res) => {
        const { id } = req.body;

        try {
            await connectDB();

            const user = await UserRegistration.findByIdAndDelete(id);

            if (!user) {
                res.statusMessage = "User Does Not Exist";
                res.status(418);
                res.end();
                return;
            }

            await sendRejectEmail(user);
        } catch (err) {
            console.log(err);
        }
        res.end();
    }
);
