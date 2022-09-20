import authenticatedHandler from "@util/api/authenticatedHandler";

import { serialize } from "cookie";

export default authenticatedHandler().head((req, res) => {
    res.setHeader(
        "Set-Cookie",
        serialize("session", "", {
            expires: new Date(0),
            maxAge: 0,
            httpOnly: true,
            sameSite: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
        })
    );
    res.status(200).end();
});
