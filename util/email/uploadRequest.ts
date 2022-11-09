import transport from "./transport";
import { IFolderSchema, IResourceSchema, IUserSchema, User } from "@db/models";
import { AccountType } from "@util/Enums";

export async function sendUserUploadResponseEmail(
    receiver: IUserSchema,
    resource: IResourceSchema
) {
    const { email, firstName, lastName } = receiver;

    await transport.sendMail({
        from: process.env.SERVICE_EMAIL,
        to: email,
        subject: "Processing Upload Request",
        html: `Dear ${firstName} ${lastName}, 
        <br /><br />
        Greetings of Peace!
        <br /><br />
        Please take note that your document/file is under the review of the vetting system of C.O.R.E. You will receive a confirmation email within three to five (3-5) working days once it is approved for uploading into the System. 
        <br /><br />
        Here are the details of your upload request: <br />
        <b>File name</b>: ${resource.filename} <br />
        <b>File type</b>: ${resource.fileType} <br />
        <b>Date requested to upload</b>: ${resource.dateAdded.toLocaleDateString()} <br />
        <b>Status</b>: ${resource.status.replace("_", " ")} <br />
        <br /><br />
        For further inquiries, kindly contact CEAP at info@ceap.org.ph and ceap-aimu@ceap.org.ph.
        <br /><br />
        Thank you!
        <br /><br />
        Kind Regards,
        <br />
        Catholic Educational Association of the Philippines (CEAP)
        `,
    });
    if (receiver.accountType === AccountType.MS_USER) {
        const admins = await User.find({
            memberSchool: receiver.memberSchool,
            accountType: AccountType.MS_ADMIN,
        });

        const queue: Promise<void>[] = [];
        for (let admin of admins) {
            queue.push(
                sendUploadRequestNotification(admin, receiver, resource)
            );
        }

        await Promise.all(queue);
    }
}

export async function sendUploadRequestNotification(
    receiver: IUserSchema,
    uploader: IUserSchema,
    resource: IResourceSchema
) {
    const { email, firstName, lastName } = receiver;

    await transport.sendMail({
        from: process.env.SERVICE_EMAIL,
        to: email,
        subject: "Request For Upload",
        html: `
        Dear ${firstName} ${lastName}, 
        <br /><br />
        Greetings of Peace!
        <br /><br />
        ${uploader.firstName} ${
            uploader.lastName
        } has requested to upload a resource to C.O.R.E. and is now upon your review and approval.
        <br /><br />
        Here are the details of his/her upload request:<br />
        <b>File name</b>: ${resource.filename}<br />
        <b>File type</b>: ${resource.fileType}<br />
        <b>Date requested to upload</b>: ${resource.dateAdded.toLocaleString()}<br />
        <b>Status</b>: ${resource.status.replace("_", " ")}
        <br /><br />
        Kindly proceed to C.O.R.E. Upload Requests page to access and review the resource.
        <br /><br />
        For further inquiries, kindly contact CEAP at info@ceap.org.ph and ceap-aimu@ceap.org.ph.
        <br /><br />
        Thank you!
        <br /><br />
        Kind Regards,
        <br />
        Catholic Educational Association of the Philippines (CEAP)
                `,
    });
}

export async function sendUploadRequestAcceptEmail(
    receiver: IUserSchema,
    resource: IResourceSchema,
    folder: IFolderSchema
) {
    const { firstName, lastName, email } = receiver;

    await transport.sendMail({
        from: process.env.SERVICE_EMAIL,
        to: email,
        subject: "Request For Upload",
        html: `
        Dear ${firstName} ${lastName}, 
        <br /><br />
        Greetings of Peace!
        <br /><br />
        Upon reviewing your request, we are glad to inform you that your document/file has been APPROVED for uploading. After examining its compliance with our policies, we have not detected any issues. Your document/file has been posted in the C.O.R.E. Resources page.
        <br /><br />
        Here are the details of your upload request:
        <b>File name</b>: ${resource.filename}<br />
        <b>File type</b>: ${resource.fileType}<br />
        <b>File location</b>: ${folder.fullPath}/${resource.filename}<br />
        <b>Date requested to upload</b>: ${resource.dateAdded.toLocaleString()}<br />
        Status: APPROVED
        <br /><br />
        For further inquiries, kindly contact CEAP at info@ceap.org.ph and ceap-aimu@ceap.org.ph.
        <br /><br />
        Thank you!
        <br /><br />
        Kind Regards, <br />
        Catholic Educational Association of the Philippines (CEAP)
        
        `,
    });
}
export async function sendUploadRequestRejectEmail(
    receiver: IUserSchema,
    resource: IResourceSchema
) {
    const { firstName, lastName, email } = receiver;

    await transport.sendMail({
        from: process.env.SERVICE_EMAIL,
        to: email,
        subject: "Request For Upload",
        html: `
        Dear ${firstName} ${lastName}, 
        <br /><br />
        Greetings of Peace!
        <br /><br />
        Upon reviewing your request, we regret to inform you that your document/file has been REJECTED for uploading. After examining its compliance with our policies, we have noticed some issues regarding the contents of your resource.
        <br /><br />
        Here are the details of your upload request:<br />
        <b>File name</b>: ${resource.filename}<br />
        <b>File type</b>: ${resource.fileType}<br />
        <b>Date requested to upload</b>: ${resource.dateAdded.toLocaleString()}<br />
        Status: REJECTED
        <br /><br />
        For further inquiries, kindly contact CEAP at info@ceap.org.ph and ceap-aimu@ceap.org.ph.
        <br /><br />
        Thank you!
        <br /><br />
        Kind Regards,<br />
        Catholic Educational Association of the Philippines (CEAP)
        `,
    });
}
