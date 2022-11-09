import authenticatedHandler from "@util/api/authenticatedHandler";
import { connectDB, Resource, User } from "@db/index";
import { ResourceStatus, AccountType } from "@util/Enums";
import { Action, logAction } from "@util/logging";

export default authenticatedHandler([AccountType.MS_ADMIN]).patch(
    async (req, res) => {
        const { id } = req.query;
        try {
            await connectDB();
            const resource = await Resource.findByIdAndUpdate(id, {
                status: ResourceStatus.FOR_CEAP_REVIEW,
            }).orFail();
            res.status(200);
            const a = await User.findOne({ authId: req.uid });
            if (a && resource) {
                await logAction(
                    a,
                    Action.MODIFY_RESOURCE,
                    `Forwarded file (${resource.filename}) to CEAP.`
                );
            }
        } catch (err) {
            console.log(err);
            res.statusMessage = "Error in forwarding resources to CEAP.";
            res.status(500);
        }
        res.end();
    }
);
