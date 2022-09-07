import handler from "@util/api/handler";

import { getAuth } from "firebase-admin/auth";
import { serialize } from "cookie";

export default handler().head(async (req, res) => {
    const token = req.headers["authorization"];
    const auth = getAuth();

    if (!token) {
        res.status(401).json({ msg: "Authorization Header Missing." });
    } else {
        try {
            await auth.verifyIdToken(token);
            res.setHeader(
                "Set-Cookie",
                serialize("token", token, {
                    httpOnly: true,
                    sameSite: true,
                    maxAge: 60 * 60 * 24 * 3,
                    path: "/",
                    // secure: true,
                })
            );
            res.status(200).json({ msg: "Logged In Successfully." });
        } catch (err) {
            res.status(401).json({ msg: "Invalid Token." });
        }
    }
});
