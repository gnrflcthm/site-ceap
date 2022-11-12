import { connectDB, Resource } from "@db/index";
import handler from "@util/api/handler";

export default handler().get(async (req, res) => {
    const { id } = req.query;

    try {
        await connectDB();
        const resource = await Resource.findById(id)
            .populate("uploadedBy")
            .populate("memberSchool")
            .orFail();
        
        res.status(200).json(resource);
    } catch (err) {
        console.log(err);
        res.statusMessage = "Error in retrieving resource information.";
        res.status(400);
    }
    res.end();
});
