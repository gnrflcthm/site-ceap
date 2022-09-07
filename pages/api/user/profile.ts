import authenticatedHandler from "@util/api/authenticatedHandler";
import { prisma } from "../../../prisma/db";

export default authenticatedHandler().get(async ({ uid }, res) => {
    const userInfo = await prisma.user.findFirst({
        where: {
            authId: uid,
        },
        include: {
            memberSchool: true,
        },
    });

    if (userInfo) {
        res.status(200).json(userInfo);
    } else {
    }
});
