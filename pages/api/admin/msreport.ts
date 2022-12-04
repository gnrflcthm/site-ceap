import authenticatedHandler from "@util/api/authenticatedHandler";
import { AccountType } from "@util/Enums";
import { generateMSReport } from "@util/reports";
import path from "path";
import { createReadStream, createWriteStream, rmSync } from "fs";

export default authenticatedHandler([
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).get(async (req, res) => {
    try {
        const {file, fileName} = await generateMSReport();

        // const reportPath = path.join(process.cwd(), "/temp", fileName);
        // const file = createReadStream(reportPath);
        file.pipe(res);
        // file.on("close", () =>
        //     rmSync(path.join(process.cwd(), "/temp", fileName))
        // );
        // file.on("error", () =>
        //     rmSync(path.join(process.cwd(), "/temp", fileName))
        // );
        res.setHeader("Content-Type", "application/pdf");
        res.statusMessage = fileName;
        res.status(200);
        // file.on("close", async function () {
        //     res.end();
        //     rmSync(reportPath);
        // });
        file.end();
    } catch (err) {
        console.log(err);
        res.statusMessage =
            err instanceof Error ? err.message : "Error in Generating Report";
        res.status(400);
        res.end();
    }
});
