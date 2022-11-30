import authenticatedHandler from "@util/api/authenticatedHandler";

import { sendUserRejectEmail } from "@util/email";
import { connectDB, MemberSchool, User, UserRegistration } from "@db/index";
import { AccountType } from "@util/Enums";
import { logAction, Action } from "@util/logging";

export default authenticatedHandler([AccountType.MS_ADMIN]).post(
    async (req, res) => {
        const { id, reason } = req.body;

        try {
            await connectDB();

            const user = await UserRegistration.findByIdAndDelete(id);

            if (!user) {
                res.statusMessage = "User Does Not Exist";
                throw new Error("User Does Not Exist");
            }

            const a = await User.findOne({ authId: req.uid });
            const ms = await MemberSchool.findById(user.memberSchool);
            if (a && ms) {
                await logAction(
                    a,
                    Action.REJECT_USER_REGISTRATION,
                    `Rejected User Registration From ${ms.name}`
                );
                await sendUserRejectEmail(user, ms.name, reason);
            }
        } catch (err) {
            console.log(err);
            res.statusMessage =
                res.statusMessage || "Error in rejecting registration request";
            res.status(400);
        }
        res.end();
    }
);
