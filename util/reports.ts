import { jsPDF, CellConfig } from "jspdf";
import { connectDB, Log, ILogSchema } from "@db/index";
import { existsSync, mkdirSync } from "fs";
import { join, resolve } from "path";
import pdfmake from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { createWriteStream } from "fs";

import coreLogo from "@assets/CORE_L.png";
import ceapLogo from "@assets/CEAP.png";

export async function generateAuditReport(
    from: Date,
    to: Date
): Promise<string> {
    // @ts-ignore
    const baseDir = global.__basedir;
    if (!existsSync(join(baseDir, "/temp"))) {
        mkdirSync(join(baseDir, "/temp"));
    }

    // const doc = new jsPDF({ orientation: "l", format: "letter" });

    const fonts = {
        Roboto: {
            normal: "style/fonts/Roboto-Regular.ttf",
            bold: "style/fonts/Roboto-Medium.ttf",
            italics: "style/fonts/Roboto-Italic.ttf",
            bolditalics: "style/fonts/Roboto-MediumItalic.ttf",
        },
    };

    const doc = new pdfmake(fonts);

    await connectDB();
    const data: Array<
        ILogSchema & {
            datePerformed: string;
            user: { displayName: string };
        }
    > = await Log.find({
        datePerformed: { $gte: from, $lte: to },
    }).populate("user", ["displayName"]);

    if (data.length === 0) {
        throw new Error("No Logs to Report");
    }

    // const temp = data.map((d) => ({
    //     "Date Performed": d.datePerformed.toLocaleString(),
    //     User: d.user?.displayName || "DELETED USER",
    //     Action: d.action,
    //     Details: d.details || "",
    // }));

    let s = from.toISOString().split("T")[0];
    let e = to.toISOString().split("T")[0];

    const content: TDocumentDefinitions = {
        pageSize: "LEGAL",
        pageOrientation: "landscape",
        content: [
            {
                layout: "noBorders",
                margin: [0, 0, 0, 20],
                table: {
                    widths: [125, "*", 100],
                    body: [
                        [
                            {
                                image: "public/CORE_L.png",
                                width: 125,
                                alignment: "left",
                            },
                            {
                                layout: "noBorders",
                                alignment: "center",
                                table: {
                                    widths: "*",
                                    body: [
                                        [" "],
                                        [
                                            {
                                                text: "Audit Reports",
                                                bold: true,
                                                alignment: "center",
                                                fontSize: 24,
                                            },
                                        ],
                                        [
                                            {
                                                text: `${s} - ${e}`,
                                                alignment: "center",
                                            },
                                        ],
                                    ],
                                },
                            },
                            {
                                image: "public/CEAP.png",
                                width: 100,
                                alignment: "right",
                            },
                        ],
                    ],
                },
            },
            {
                table: {
                    headerRows: 1,
                    dontBreakRows: true,
                    widths: [150, 100, 125, "*"],
                    body: [
                        ["Date Performed", "User", "Action", "Details"].map(
                            (h) => ({ text: h, style: "header" })
                        ),
                    ].concat(
                        // @ts-ignore
                        data.map((log) => [
                            log.datePerformed.toLocaleString(),
                            log.user?.displayName || "DELETED USER",
                            log.action,
                            log.details || "",
                        ])
                    ),
                },
            },
        ],
        styles: {
            header: {
                bold: true,
                alignment: "center",
            },
        },
    };

    const date =
        from.toDateString() === to.toDateString()
            ? from.toDateString()
            : `${from.toDateString()} - ${to.toDateString()}`;

    // doc.text(`Audit Log Reports (${date})`, 5, 10);
    // doc.table(6, 15, temp, createHeaders(Object.keys(temp[0])), {});

    const pdfDoc = doc.createPdfKitDocument(content);

    const fileName = `AuditReports(${s === e ? s : s + " - " + e}).pdf`;

    return new Promise<string>((resolve, reject) => {
        pdfDoc.write(`temp/${fileName}`, () => resolve(fileName));

        // pdfDoc
        //     .pipe(createWriteStream(`temp/${fileName}`))
        //     .on("pipe", () => console.log("pipe"))
        //     .on("ready", () => console.log("ready"))
        //     .on("error", (err) => console.log(err))
        //     .on("drain", () => console.log("drain"))
        //     .on("finish", () => resolve(fileName));
    });
}

function createHeaders(keys: string[]): CellConfig[] {
    var result: CellConfig[] = [];
    const size = [80, 65, 70, 140];
    for (var i = 0; i < keys.length; i += 1) {
        result.push({
            name: keys[i],
            prompt: keys[i],
            width: size[i],
            align: "center",
            padding: 0,
        });
    }
    return result;
}
