import { connectDB, Folder } from "@db/index";
import handler from "@util/api/handler";

export default handler().get(async (req, res) => {
    const { id } = req.query;
    try {
        await connectDB();
        const folder = await Folder.findById(id).populate("root", ["id"]);
        res.status(200).json(folder);
    } catch (err) {
        console.log(err);
        res.statusMessage = "Error in retrieving folder information";
        res.status(400);
    }
    res.end();
});
