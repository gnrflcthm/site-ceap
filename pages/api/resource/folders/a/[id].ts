import authenticatedHandler from "@util/api/authenticatedHandler";
import { connectDB, Folder, Resource } from "@db/index";
import { AccountType } from "@util/Enums";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
])
    .patch(async (req, res) => {
        const { id } = req.query;
        const { name } = req.body;

        try {
            await connectDB();

            const folder = await Folder.findById(id);

            const root = await Folder.findById(folder?.root);

            if (folder && root) {
                folder.name = name;
                folder.fullPath = root.fullPath + `/${name}`;
                await folder.save();
            }

            res.status(200);
        } catch (err) {
            console.log(err);
            res.statusMessage = "Error in updating folder.";
            res.status(400);
        }
        res.end();
    })
    .delete(async (req, res) => {
        const { id } = req.query;

        try {
            await connectDB();

            const childFolders = await Folder.find({ root: id });
            const childResources = await Resource.find({ folder: id });

            if (childFolders.length > 0 || childResources.length > 0) {
                res.statusMessage =
                    "Cannot delete folder with existing sub-directories or resources.";
                throw new Error(
                    "Cannot delete folder with existing sub-directories or resources."
                );
            }

            await Folder.findByIdAndDelete(id);

            res.status(200);
        } catch (err) {
            console.log(err);
            res.statusMessage =
                res.statusMessage || "Error in deleting folder.";
            res.status(400);
        }
        res.end();
    });
