import { AccountType } from "./Enums";
import { connectDB, Log, ILogSchema, MemberSchool, User } from "@db/index";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";
import pdfmake from "pdfmake";
import { TDocumentDefinitions } from "pdfmake/interfaces";

export async function generateAuditReport(
    from: Date,
    to: Date
): Promise<string> {
    // @ts-ignore
    const baseDir = global.__basedir;
    if (!existsSync(join(baseDir, "/temp"))) {
        mkdirSync(join(baseDir, "/temp"));
    }

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

    // const date =
    //     from.toDateString() === to.toDateString()
    //         ? from.toDateString()
    //         : `${from.toDateString()} - ${to.toDateString()}`;

    const pdfDoc = doc.createPdfKitDocument(content);

    const fileName = `AuditReports(${s === e ? s : s + " - " + e}).pdf`;

    return new Promise<string>((resolve, reject) => {
        pdfDoc.write(`temp/${fileName}`, () => resolve(fileName));
    });
}

export async function generateMSReport() {
    // @ts-ignore
    const baseDir = global.__basedir;
    if (!existsSync(join(baseDir, "/temp"))) {
        mkdirSync(join(baseDir, "/temp"));
    }

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

    const msQuery = MemberSchool.aggregate([
        {
            $lookup: {
                from: "User",
                localField: "_id",
                foreignField: "memberSchool",
                as: "users",
            },
        },
        {
            $match: {
                isRegistered: true,
            },
        },
        {
            $addFields: {
                adminCount: {
                    $size: {
                        $filter: {
                            input: "$users",
                            as: "user",
                            cond: {
                                $eq: ["$$user.accountType", "MS_ADMIN"],
                            },
                        },
                    },
                },
                userCount: {
                    $size: {
                        $filter: {
                            input: "$users",
                            as: "user",
                            cond: {
                                $eq: ["$$user.accountType", "MS_USER"],
                            },
                        },
                    },
                },
            },
        },
        {
            $sort: {
                "region": 1,
                "name": 1,
            }
        }
    ]);
    const userCountQuery = User.count({
        accountType: [AccountType.MS_ADMIN, AccountType.MS_USER],
    });

    const [registeredMemberSchools, userCount] = await Promise.all([
        msQuery,
        userCountQuery,
    ]);

    const content: TDocumentDefinitions = {
        pageSize: "LEGAL",
        pageOrientation: "portrait",
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
                                                text: "Member School Reports",
                                                bold: true,
                                                alignment: "center",
                                                fontSize: 24,
                                            },
                                        ],
                                        [
                                            {
                                                text: `As of ${new Date().toDateString()}`,
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
                layout: "noBorders",
                margin: [20, 0],
                table: {
                    body: [
                        [
                            {
                                text: "Total Registered Member Schools:",
                                alignment: "right",
                            },
                            registeredMemberSchools.length,
                        ],
                        [
                            { text: "Total Active Users:", alignment: "right" },
                            userCount,
                        ],
                    ],
                },
            },
            {
                margin: [0, 20],
                table: {
                    headerRows: 2,
                    widths: ["*", 100, 50, 50, 50],
                    body: [
                        [{text: "Registered Member Schools", colSpan: 5, bold: true, alignment: "center", fontSize: 18, fillColor: "#0F1A64", color: "#FFF"}, {}, {}, {}, {}],
                        ["Member School", "Region", "Total Admins", "Total Users", "Total Active Users"].map(
                            (header) => ({
                                text: header,
                                bold: true,
                                alignment: "center",
                            })
                        ),
                        ...registeredMemberSchools.map((ms) => [ms.name, ms.region, ms.adminCount, ms.userCount, ms.adminCount + ms.userCount])
                    ]
                }
            },
        ],
        styles: {
            header: {
                bold: true,
                alignment: "center",
            },
        },
    };

    const pdfDoc = doc.createPdfKitDocument(content);

    const fileName = `MemberSchoolReports(${new Date().toLocaleDateString()}).pdf`;

    return { file: pdfDoc, fileName };
}
