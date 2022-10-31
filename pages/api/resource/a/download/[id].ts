import authenticatedHandler from "@util/api/authenticatedHandler";
import { generateDownloadLink } from "@util/functions/blob";
import { connectDB, Resource } from "@db/index";

import { FileAccessibility } from "@util/Enums";

export default authenticatedHandler().get(async (req, res) => {
    const { id } = req.query;

    if (!id) {
        res.statusMessage = "Not Found!";
        res.status(404);
        res.end();
        return;
    } else {
        let resourceId = id as string;

        let accessibility: FileAccessibility[] = [FileAccessibility.PUBLIC];

        if (["CEAP_ADMIN", "CEAP_SUPER_ADMIN"].includes(req.role)) {
            accessibility = [
                FileAccessibility.HIDDEN,
                FileAccessibility.PRIVATE,
                FileAccessibility.PUBLIC,
            ];
        } else {
            accessibility = [
                FileAccessibility.PRIVATE,
                FileAccessibility.PUBLIC,
            ];
        }

        await connectDB();

        const resource = await Resource.findOne({
            id: resourceId,
            accessibility: {
                $in: accessibility,
            },
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
