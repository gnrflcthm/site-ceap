import handler from "@util/api/handler";
import { connectDB, Folder } from "@db/index";

export default handler().get(async (_, res) => {
    try {
        await connectDB();
        const classifications = await Folder.find({
            root: undefined,
        });
        res.status(200).json(classifications);
    } catch (error) {
        console.log(error);
        res.status(500);
        res.statusMessage = "Error in retrieving classifications";
    }
    res.end();
});
