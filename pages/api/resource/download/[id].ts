import handler from "@util/api/handler";
import { generateDownloadLink } from "@util/functions/blob";

import { connectDB, Resource } from "@db/index";
import { FileAccessibility } from "@util/Enums";

export default handler().get(async (req, res) => {
    const { id } = req.query;

    if (!id) {
        res.statusMessage = "Not Found!";
        res.status(404);
        res.end();
        return;
    } else {
        let resourceId = id as string;

        await connectDB();

        const resource = await Resource.findById(resourceId);

        if (!resource) {
            res.statusMessage = "Not Found!";
            res.status(404);
            res.end();
            return;
        }

        let downloadLink: string;

        try {
            if (
                [FileAccessibility.PRIVATE, FileAccessibility.HIDDEN].includes(
                    resource.accessibility
                )
            ) {
                res.statusMessage =
                    "You do not have enough permission to access this file.";
                res.statusCode = 401;
                throw new Error(
                    "You do not have enough permission to access this file."
                );
            }

            downloadLink = await generateDownloadLink(
                resource.blobPath,
                resource.filename
            );
            res.status(200).json({ downloadLink });
        } catch (error) {
            res.statusMessage =
                res.statusMessage || "Error in Generating Download Link";
            res.status(res.statusCode || 500);
        }
        res.end();
    }
});
