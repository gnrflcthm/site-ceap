import handler from "@util/api/handler";
import { connectDB, Folder } from "@db/index";

export default handler().get(async (req, res) => {
    const { id } = req.query;
    try {
        await connectDB();
        const folder = await Folder.findById(id);

        if (!folder) {
            res.statusMessage = "Specified folder does not exist.";
            res.status(400);
            return;
        }

        if (folder.root) {
            const root = await Folder.findById(folder.root);
            res.status(200).json(root);
        }
    } catch (error) {
        console.log(error);
        res.statusMessage = "Error in retrieving root";
        res.status(400);
    }
    res.end();
});
