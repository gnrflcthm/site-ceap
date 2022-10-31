import authenticatedHandler from "@util/api/authenticatedHandler";
import { connectDB, User } from "@db/index";
import { AccountType } from "@util/Enums";

export default authenticatedHandler([AccountType.CEAP_SUPER_ADMIN]).get(
    async (req, res) => {
        try {
            const accounts = await User.find({
                accountType: [
                    AccountType.CEAP_ADMIN,
                    AccountType.CEAP_SUPER_ADMIN,
                ],
                authId: {
                    $ne: req.uid,
                },
            });
            res.status(200).json(accounts);
        } catch (err) {
            console.log(err);
            res.statusMessage = "An Error has occured retrieving data.";
            res.status(500);
        }
        res.end();
    }
);
