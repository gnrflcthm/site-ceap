import authenticatedHandler from "@util/api/authenticatedHandler";
import { getAuth } from "firebase-admin/auth";

export default authenticatedHandler().post(async (req, res) => {
    const auth = getAuth();
    try {
        const { customClaims, uid, displayName } = await auth.getUser(req.uid);
        const data = { uid, displayName, role: customClaims?.role };
        res.status(200).json(data);
    } catch (err) {
        res.statusMessage = "An Error Has Occured Validating Current User.";
        res.status(500);
    }
    res.end();
});
