import { Action, logAction } from "@util/logging";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { AccountType } from "@util/Enums";
import { connectDB, Folder, Resource, User } from "@db/index";
import { sendUploadRequestAcceptEmail } from "@util/email";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).patch(async (req, res) => {
    const { id } = req.query;
    const data = req.body;

    try {
        await connectDB();

        const newInfo = { ...data };
        const resource = await Resource.findByIdAndUpdate(id, newInfo);
        res.status(200);

        const a = await User.findOne({ authId: req.uid });
        if (a && resource) {
            const res = await Resource.findById(id);
            const folder = await Folder.findById(res?.folder);
            if (res) {
                if ("accept" in req.body) {
                    await logAction(
                        a,
                        Action.ACCEPT_UPLOAD,
                        `Accepted upload request (${resource.filename})`
                    );
                    const uploader = await User.findById(res?.uploadedBy);
                    if (uploader && folder) {
                        await sendUploadRequestAcceptEmail(
                            uploader,
                            res,
                            folder
                        );
                    }
                } else {
                    await logAction(
                        a,
                        Action.MODIFY_RESOURCE,
                        `Update resource (${resource.filename})`
                    );
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.statusMessage = "Error in updating resource.";
        res.status(400);
    }
    res.end();
});
