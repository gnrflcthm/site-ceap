import { connectDB, User } from "@db/index";
import authenticatedHandler from "@util/api/authenticatedHandler";
import { generateAuditReport } from "@util/reports";

export default authenticatedHandler().post(async (req, res) => {
    const { start, end } = req.body;

    await connectDB();

    try {
        const user = await User.findOne({ authId: req.uid }).orFail();

        const { file, fileName } = await generateAuditReport(
            new Date(start),
            new Date(end),
            user.accountType,
            user.memberSchool
        );

        file.pipe(res);
        res.setHeader("Content-Type", "application/pdf");
        res.statusMessage = fileName;
        res.status(200);
        file.end();
    } catch (err) {
        console.log(err);
        res.statusMessage =
            err instanceof Error ? err.message : "Error in Generating Report";
        res.status(400);
        res.end();
    }
});
