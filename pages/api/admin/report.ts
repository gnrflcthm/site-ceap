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

        const file = createReadStream(
            path.join(process.cwd(), "/temp", fileName)
        );
        file.pipe(res);
        file.on("close", () => rmSync(path.join(process.cwd(), "/temp", fileName)))
        file.on("error", () => rmSync(path.join(process.cwd(), "/temp", fileName)))
        res.setHeader("Content-Type", "application/pdf");
        res.statusMessage = fileName;
        res.status(200);
    } catch (err) {
        console.log(err);
        res.statusMessage =
            err instanceof Error ? err.message : "Error in Generating Report";
        res.status(400);
        res.end();
    }
});
