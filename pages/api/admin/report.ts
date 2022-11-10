import authenticatedHandler from "@util/api/authenticatedHandler";
import { generateAuditReport } from "@util/reports";

import { createReadStream } from "fs";
import path from "path";

export default authenticatedHandler().post(async (req, res) => {
    const { start, end } = req.body;

    try {
        const fileName = await generateAuditReport(
            new Date(start),
            new Date(end)
        );

        const file = createReadStream(
            path.join(process.cwd(), "/temp", fileName)
        );
        file.pipe(res);
        res.setHeader("Content-Type", "application/json");
        res.statusMessage = fileName;
        res.status(200);
    } catch (err) {
        res.statusMessage =
            err instanceof Error ? err.message : "Error in Generating Report";
        res.status(400);
        res.end();
    }
});
