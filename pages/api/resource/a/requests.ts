import authenticatedHandler from "@util/api/authenticatedHandler";

import { connectDB, Folder, Resource, User } from "@db/index";
import { AccountType, RequestStatus } from "@util/Enums";

export default authenticatedHandler([
    AccountType.MS_ADMIN,
    AccountType.CEAP_ADMIN,
    AccountType.CEAP_SUPER_ADMIN,
]).get(async (req, res) => {
    await connectDB();

    const user = await User.findOne({ authId: req.uid });

    if (!user) {
        res.statusMessage = "User does not exist";
        res.status(401);
        res.end();
        return;
    }

    // const temp = [
    //     "Christian Formation",
    //     "Basic Education",
    //     "Higher Education",
    //     "Techinical Vocation Education",
    //     "ALS & SPED",
    //     "Programs",
    //     "National Convention",
    //     "Advocacy",
    //     "Research",
    //     "General CEAP",
    //     "COCOPEA & PEAC",
    //     "International Linkages",
    //     "Others",
    // ];

    // const tempData = temp.map((name) => ({ name, fullPath: `/${name}` }));
    // await Folder.insertMany(tempData);

    let uploads = [];

    try {
        switch (user.accountType) {
            case AccountType.CEAP_SUPER_ADMIN:
            case AccountType.CEAP_ADMIN:
                uploads = await Resource.find({
                    status: RequestStatus.FOR_CEAP_REVIEW,
                })
                    .populate({
                        path: "uploadedBy",
                        select: "id displayName memberSchool",
                        populate: {
                            path: "memberSchool",
                            select: "id",
                        },
                    })
                    .exec();
                res.status(200);
                res.json(
                    uploads.map((ur) => ({
                        ...ur.toJSON(),
                        dateAdded: ur.dateAdded.toDateString(),
                    }))
                );
                return;
            case AccountType.MS_ADMIN:
                uploads = await Resource.find({
                    status: RequestStatus.FOR_ADMIN_REVIEW,
                })
                    .populate({
                        path: "uploadedBy",
                        select: "id displayName memberSchool",
                        populate: {
                            path: "memberSchool",
                            select: "id",
                        },
                    })
                    .exec();

                uploads = uploads.filter((ur) =>
                    // @ts-ignore
                    ur.uploadedBy?.memberSchool.equals(user.memberSchool)
                );
                res.json(
                    uploads.map((ur) => ({
                        ...ur.toJSON(),
                        dateAdded: ur.dateAdded.toDateString(),
                    }))
                );
        }
        res.status(200);
    } catch (error) {
        console.log(error);
        res.statusMessage = "Error in retrieving Upload Requests.";
        res.status(500);
    }
    res.end();
});
