import { NextApiRequest, NextApiResponse } from "next";

import { getAuth } from "firebase-admin/auth";
import "../../firebase/admin";

import { AccountType } from "@prisma/client";

import { serialize } from "cookie";

import nextConnect, { NextConnect } from "next-connect";
interface AuthenticatedRequest extends NextApiRequest {
    role: AccountType;
    uid: string;
}

export default function (
    authorizedRoles?: AccountType[]
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
    }).all(async (req, res, next) => {
        const { session } = req.cookies;
        const auth = getAuth();

        if (!session) {
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

            if (authorizedRoles && !authorizedRoles.includes(req.role)) {
                res.statusMessage =
                    "You do not have sufficient permission to perform this action.";
                res.status(403);
                res.end();
                return;
            }
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
