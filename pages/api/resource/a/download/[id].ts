import authenticatedHandler from "@util/api/authenticatedHandler";
import { generateDownloadLink } from "@util/functions/blob";
import { connectDB, Resource, User } from "@db/index";

import { AccountType, FileAccessibility } from "@util/Enums";

export default authenticatedHandler().get(async (req, res) => {
    const { id } = req.query;

    if (!id) {
        res.statusMessage = "Not Found!";
        res.status(404);
        res.end();
        return;
    } else {
        let resourceId = id as string;

        const user = await User.findOne({ authId: req.uid });

        await connectDB();

        const resource = await Resource.findById(resourceId).populate(
            "uploadedBy",
            ["id", "memberSchool"]
        );

        if (!resource) {
            res.statusMessage = "Not Found!";
            res.status(404);
            res.end();
            return;
        }

        let downloadLink: string;

        try {
            if (
                resource.uploadedBy?.id !== user?.id &&
                ![
                    AccountType.CEAP_ADMIN,
                    AccountType.CEAP_SUPER_ADMIN,
                ].includes(user?.accountType || AccountType.MS_USER)
            ) {
                switch (user?.accountType) {
                    case AccountType.MS_ADMIN:
                        if (
                            user.memberSchool?.toHexString() !==
                            resource.uploadedBy.memberSchool?.toHexString()
                        ) {
                            res.statusMessage =
                                "You do not have enough permission to access this file.";
                            res.statusCode = 401;
                            throw new Error(
                                "You do not have enough permission to access this file."
                            );
                        }
                        break;
                    case AccountType.MS_USER:
                        res.statusMessage =
                            "You do not have enough permission to access this file.";
                        res.statusCode = 401;
                        throw new Error(
                            "You do not have enough permission to access this file."
                        );
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
