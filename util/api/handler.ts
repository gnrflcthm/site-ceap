import { NextApiRequest, NextApiResponse } from "next";
import nextConnect, { NextConnect } from "next-connect";

import "../../firebase/admin";

export default function (): NextConnect<NextApiRequest, NextApiResponse> {
    return nextConnect<NextApiRequest, NextApiResponse>({
        onError: (req, res) => {},
        onNoMatch: (req, res) => {},
    });
}
