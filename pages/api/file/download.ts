import { NextApiRequest, NextApiResponse } from "next";

import nextConnect from "next-connect";
import { lookup } from "mime-types";
import { prisma } from "../../../prisma/db";

import { getStorage, Storage } from "firebase-admin/storage";
import "../../../firebase";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

interface FileDownloadBody {
    filepath: string;
}

handler.post(async (req, res) => {
    // TODO: Making Handler Reusable

    // TODO: User Authorization

    const { filepath } = req.body as FileDownloadBody;

    const resource = await prisma.resource.findFirst({
        where: {
            filepath,
        },
    });

    const storage: Storage = getStorage();
    const bucket = storage.bucket("site-ceap-63527.appspot.com");

    const file = bucket.file(filepath);

    res.setHeader("Content-Type", lookup(resource?.filename || "") || "");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${resource?.filename}`
    );

    file.createReadStream().pipe(res);
});

export default handler;
