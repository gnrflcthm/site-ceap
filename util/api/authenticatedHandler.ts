import { NextApiRequest, NextApiResponse } from "next";

import { getAuth } from "firebase-admin/auth";
import "../../firebase/admin";

import { AccountType } from "@util/Enums";

import { serialize } from "cookie";
import parseMultipartForm from "../middleware/fileparser";
import { Files } from "formidable";

import nextConnect, { NextConnect } from "next-connect";
interface AuthenticatedRequest extends NextApiRequest {
    role: AccountType;
    uid: string;
    isLoggedIn: boolean;
    files?: Files;
}

export default function (
    authorizedRoles?: AccountType[],
    loginCheck: boolean = false
): NextConnect<AuthenticatedRequest, NextApiResponse> {
    return nextConnect<AuthenticatedRequest, NextApiResponse>({
        onError: (err, req, res) => {
            console.log("Error: ", err);
            res.end();
        },
        onNoMatch: (req, res) => {
            console.log("Not Found");
            res.end();
        },
    })
        .use(parseMultipartForm)
        .all(async (req, res, next) => {
            const { session } = req.cookies;
            const auth = getAuth();

            if (!session) {
                if (loginCheck) {
                    req.isLoggedIn = false;
                    next();
                    return;
                }
                res.statusMessage = "You Are Not Logged In.";
                res.status(401);
                res.end();
                return;
            }
            try {
                const { uid } = await auth.verifySessionCookie(session!);
                const { customClaims } = await auth.getUser(uid);

                req.uid = uid;

                if (customClaims?.role) {
                    req.role = customClaims.role;
                }

                if (!loginCheck) {
                    if (
                        authorizedRoles &&
                        !authorizedRoles.includes(req.role)
                    ) {
                        res.statusMessage =
                            "You do not have sufficient permission to perform this action.";
                        res.status(403);
                        res.end();
                        return;
                    }
                }
                req.isLoggedIn = true;
                next();
            } catch (err) {
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
                res.statusMessage = "Invalid or Expired Token.";
                res.status(401);
                res.end();
            }
        });
}
