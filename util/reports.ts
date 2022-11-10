import { jsPDF, CellConfig } from "jspdf";
import { connectDB, Log, ILogSchema } from "@db/index";

export async function generateAuditReport(from: Date, to: Date): Promise<string> {
    const doc = new jsPDF({ orientation: "l", format: "letter" });

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

    const temp = data.map((d) => ({
        "Date Performed": d.datePerformed.toLocaleString(),
        User: d.user?.displayName || "DELETED USER",
        Action: d.action,
        Details: d.details || "",
    }));

    const date =
        from.toDateString() === to.toDateString()
            ? from.toDateString()
            : `${from.toDateString()} - ${to.toDateString()}`;

    doc.text(`Audit Log Reports (${date})`, 5, 10);
    doc.table(6, 15, temp, createHeaders(Object.keys(temp[0])), {
        autoSize: true,
    });

    let s = from.toISOString().split("T")[0];
    const fileName = `AuditReports(${s}).pdf`;

    doc.save(`temp/${fileName}`);
    doc.save("test.pdf");

    return fileName;
}

function createHeaders(keys: string[]): CellConfig[] {
    var result: CellConfig[] = [];
    for (var i = 0; i < keys.length; i += 1) {
        result.push({
            name: keys[i],
            prompt: keys[i],
            width: 65,
            align: "center",
            padding: 0,
        });
    }
    return result;
}
