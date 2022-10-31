import authenticatedHandler from "@util/api/authenticatedHandler";
import { connectDB, Resource } from "@db/index";
import { RequestStatus, AccountType } from "@util/Enums";

export default authenticatedHandler([AccountType.MS_ADMIN]).patch(
    async (req, res) => {
        const { id } = req.query;
        try {
            await connectDB();
            await Resource.findByIdAndUpdate(id, {
                status: RequestStatus.FOR_CEAP_REVIEW,
            }).orFail();
            res.status(200);
        } catch (err) {
            console.log(err);
            res.statusMessage = "Error in forwarding resources to CEAP.";
            res.status(500);
        }
        res.end();
    }
);
