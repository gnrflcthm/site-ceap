import { connectDB, Folder, Resource } from "@db/index";
import handler from "@util/api/handler";

export default handler().get(async (req, res) => {
    const { id } = req.query;

    await connectDB();

    const folders = await Folder.find({ root: id }).count();
    const resources = await Resource.find({ folder: id }).count();

    res.status(200).json({ folderCount: folders, resourceCount: resources });
});
