import authenticatedHandler from "@util/api/authenticatedHandler";
import { connectDB, Resource, User } from "@db/index";

import { deleteResource } from "@util/functions/blob";
import { Action, logAction } from "@util/logging";
import { sendUploadRequestRejectEmail } from "@util/email/uploadRequest";

export default authenticatedHandler().delete(async (req, res) => {
    const { id } = req.query;

    await connectDB();

    const resource = await Resource.findById(id);

    if (!resource) {
        res.statusMessage = "The Requested Resource does not exist";
        res.status(400).end();
        return;
    }

    try {
        await deleteResource(resource.blobPath);
        await resource.delete();
        res.statusMessage = "Successfully removed Resource";
        res.status(200);

        const user = await User.findById(resource.uploadedBy);
        if (user) await sendUploadRequestRejectEmail(user, resource);

        const a = await User.findOne({ authId: req.uid });
        if (a) {
            await logAction(
                a,
                Action.DELETE_RESOURCE,
                `Rejected file (${resource.filename}) upload request.`
            );
        }
    } catch (error) {
        res.statusMessage = "Error in removing Resource";
        res.status(500);
    }
    res.end();
});
