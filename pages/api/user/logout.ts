import authenticatedHandler from "@util/api/authenticatedHandler";

import { serialize } from "cookie";

export default authenticatedHandler().head((req, res) => {
    res.setHeader(
        "Set-Cookie",
        serialize("token", "", {
            expires: new Date(0),
            maxAge: 0,
            httpOnly: true,
            sameSite: true,
            // secure: true
            path: "/",
        })
    );
    res.status(200).end();
});
