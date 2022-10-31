import { connectDB, Folder } from "@db/index";
import handler from "@util/api/handler";

export default handler().get(async (req, res) => {
    const { id } = req.query;

    try {
        await connectDB();
        const folders = await Folder.find({ root: id }).populate("root").exec();
        res.status(200).json(folders);
    } catch (err) {
        res.statusMessage = "Error in retrieving folder data.";
        res.status(500).json([]);
    }
    res.end();
});
