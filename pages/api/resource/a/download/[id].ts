import authenticatedHandler from "@util/api/authenticatedHandler";
import { generateDownloadLink } from "@util/functions/blob";
import { connectDB, Resource, User } from "@db/index";

import { AccountType, FileAccessibility, ResourceStatus } from "@util/Enums";

export default authenticatedHandler().get(async (req, res) => {
    const { id } = req.query;

    if (!id) {
        res.statusMessage = "Not Found!";
        res.status(404);
        res.end();
        return;
    } else {
        let resourceId = id as string;

        await connectDB();
        const user = await User.findOne({ authId: req.uid });

        const resource = await Resource.findById(resourceId);

        const uploader = await User.findById(resource?.uploadedBy);

        if (!resource) {
            res.statusMessage = "Not Found!";
            res.status(404);
            res.end();
            return;
        }

        let downloadLink: string;
        try {
            if (resource.accessibility == FileAccessibility.HIDDEN) {
                if (user) {
                    switch (user.accountType) {
                        case AccountType.MS_ADMIN:
                            if (
                                user.memberSchool?.toHexString() !==
                                //@ts-ignore
                                resource.memberSchool?.toHexString()
                            ) {
                                res.statusMessage =
                                    "You don't have enough permission to access the resource.";
                                res.statusCode = 401;
                                throw new Error(
                                    "You don't have enough permission to access the resource."
                                );
                            }
                            break;
                        case AccountType.MS_USER:
                            if (!resource.uploadedBy?.equals(user._id)) {
                                res.statusMessage =
                                    "You don't have enough permission to access the resource.";
                                res.statusCode = 401;
                                throw new Error(
                                    "You don't have enough permission to access the resource."
                                );
                            }
                    }
                }
            }

            downloadLink = await generateDownloadLink(
                resource.blobPath,
                resource.filename
            );
            res.status(200).json({ downloadLink });
        } catch (error) {
            console.log(error);
            res.statusMessage =
                res.statusMessage || "Error in Generating Download Link";
            res.status(res.statusCode || 500);
        }
        res.end();
    }
});
