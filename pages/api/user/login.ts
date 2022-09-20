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
            const cookieAge = 60 * 60 * 24 * 3;
            const cookie = await auth.createSessionCookie(token, {
                expiresIn: cookieAge * 1000,
            });
            res.setHeader(
                "Set-Cookie",
                serialize("session", cookie, {
                    httpOnly: true,
                    sameSite: true,
                    maxAge: cookieAge,
                    path: "/",
                    secure: process.env.NODE_ENV === "production",
                })
            );
            res.status(200).json({ msg: "Logged In Successfully." });
        } catch (err) {
            res.status(401).json({ msg: "Invalid Token." });
        }
    }
});
