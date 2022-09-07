import { NextApiRequest, NextApiResponse } from "next";

import { getAuth } from "firebase-admin/auth";
import "../../firebase/admin";

import { AccountType } from "@prisma/client";

import nextConnect, { NextConnect } from "next-connect";
interface AuthenticatedRequest extends NextApiRequest {
    role: AccountType;
    uid: string;
}

export default function (): NextConnect<AuthenticatedRequest, NextApiResponse> {
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
        const { token } = req.cookies;
        const auth = getAuth();

        if (!token) {
            res.statusMessage = "You Are Not Logged In.";
            res.status(401);
            res.end();
        }
        try {
            const { uid } = await auth.verifyIdToken(token!);
            const { customClaims } = await auth.getUser(uid);

            req.uid = uid;

            if (customClaims?.role) {
                req.role = customClaims.role;
            }
            next();
        } catch (err) {
            res.statusMessage = "Invalid or Expired Token.";
            res.status(401);
            res.end();
        }
    });
}
