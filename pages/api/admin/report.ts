import authenticatedHandler from "@util/api/authenticatedHandler";
import { generateAuditReport } from "@util/reports";

import { createReadStream, rmSync } from "fs";
import path from "path";

export default authenticatedHandler().post(async (req, res) => {
    const { start, end } = req.body;

    try {
        const fileName = await generateAuditReport(
            new Date(start),
            new Date(end)
        );

        const logPath = path.join(process.cwd(), "/temp", fileName);
        const file = createReadStream(logPath);
        file.pipe(res);
        res.setHeader("Content-Type", "application/pdf");
        res.statusMessage = fileName;
        res.status(200);
        file.on("close", async function () {
            res.end();
            rmSync(logPath);
        });
    } catch (err) {
        res.statusMessage = "Error in Generating Report";
        res.status(400);
        res.end();
    }
});
