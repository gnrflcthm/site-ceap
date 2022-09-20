import authenticatedHandler from "@util/api/authenticatedHandler";
import { prisma } from "../../../prisma/db";

export default authenticatedHandler().post(async (req, res) => {
    const uid = req.uid;

    const user = await prisma.user.findFirst({
        where: {
            authId: uid,
        },
    });

    res.statusMessage = "You Are Currently Logged In.";
    res.status(200).json({
        uid,
        displayName: user?.displayName,
        role: user?.accountType || "",
    });

    res.end();
});
