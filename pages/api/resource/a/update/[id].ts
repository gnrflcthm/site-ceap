import authenticatedHandler from "@util/api/authenticatedHandler";
import { AccountType } from "@util/Enums";
import { connectDB, Resource } from "@db/index";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).patch(async (req, res) => {
    const {id} = req.query;
    const data = req.body;

    try {
        await connectDB();

        const newInfo = { ...data };

        await Resource.findByIdAndUpdate(id, newInfo);
        res.status(200);
    } catch (error) {
        console.log(error);
        res.statusMessage = "Error in updating resource.";
        res.status(400);
    }

    res.end();
});
