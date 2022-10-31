import { connectDB, Folder } from "@db/index";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { AccountType } from "@util/Enums";

export default authenticatedHandler([
    AccountType.CEAP_SUPER_ADMIN,
    AccountType.CEAP_ADMIN,
]).post(async (req, res) => {
    const { root, name } = req.body;

    await connectDB();

    const rootFolder = await Folder.findById(root);

    const newFolder = new Folder({
        name,
        root,
        fullPath: rootFolder?.fullPath + `/${name}`,
    });

    try {
        await newFolder.save();
        res.status(200);
    } catch (err) {
        console.log(err);
        res.statusMessage = "Error in creating folder";
        res.status(400);
    }
    res.end();
});
