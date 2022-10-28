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

        const resource = await Resource.findOne({
            id: resourceId,
            accessibility: FileAccessibility.PUBLIC,
        });

        if (!resource) {
            res.statusMessage = "Not Found!";
            res.status(404);
            res.end();
            return;
        }

        let downloadLink: string;

        try {
            downloadLink = await generateDownloadLink(
                resource.blobPath,
                resource.filename
            );
            res.status(200).json({ downloadLink });
        } catch (error) {
            res.statusMessage = "Error in Generating Download Link";
            res.status(500);
        }
        res.end();
    }
});
