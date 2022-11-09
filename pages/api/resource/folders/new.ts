import { connectDB, Folder, User } from "@db/index";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { AccountType } from "@util/Enums";
import { Action, logAction } from "@util/logging";

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
        const a = await User.findOne({ authId: req.uid });
        if (a) {
            await logAction(
                a,
                Action.CREATED_FOLDER,
                `Created new folder ${newFolder.fullPath}`
            );
        }
    } catch (err) {
        console.log(err);
        res.statusMessage = "Error in creating folder";
        res.status(400);
    }
    res.end();
});
