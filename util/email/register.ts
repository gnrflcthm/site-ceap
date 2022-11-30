import {
    IMSAdminRegistrationSchema,
    IUserRegistrationSchema,
    IUserSchema,
} from "@db/index";
import { AccountType } from "@util/Enums";
import transport from "./transport";

export async function sendAcceptEmail(
    receiver: IUserSchema,
    initialPassword: string = "random_password",
    memberSchool: string
) {
    const { firstName, lastName, email, schoolId, mobileNumber, accountType } =
        receiver;

    await transport.sendMail({
        from: process.env.SERVICE_EMAIL,
        to: email,
        subject: "Account Accepted",
        html: `
        Dear ${firstName} ${lastName}, 
        <br /><br />
        Greetings of Peace!
        <br /><br />
        We are glad to inform you that your C.O.R.E. registration request for a ${
            accountType === AccountType.MS_ADMIN
                ? "Member School Admin"
                : "Member School User"
        } account registered under ${memberSchool} has been APPROVED.
        <br /><br />
        Here are the details of your account:<br />
        <b>Name</b>: ${firstName} ${lastName}<br />
        <b>School</b>: ${memberSchool}<br />
        <b>School ID</b>: ${schoolId || ""}<br />
        <b>Mobile number</b>: ${mobileNumber || ""}<br />
        <b>Email Address</b>: ${email}<br />
        <b>Account Type</b>:  ${accountType}<br />
        <b>Status</b>: ACCEPTED
        <br /><br />
        Here are your C.O.R.E. login credentials and temporary password:<br />
        Email: ${email}<br />
        Password: ${initialPassword}
        <br /><br />
        You may change your temporary password in your account Profile once you have logged in.
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

export async function sendUserRejectEmail(
    user: IUserRegistrationSchema,
    memberSchool: string,
    reason?: string
) {
    const { email, firstName, lastName, schoolId, mobileNumber } = user;
    await transport.sendMail({
        subject: "Account Creation Denied",
        from: process.env.SERVICE_EMAIL,
        to: email,
        html: `
        Dear ${firstName} ${lastName}, 
        <br /><br />
        Greetings of Peace!
        <br /><br />
        Upon reviewing your C.O.R.E. account registration details, we regret to inform you that your registration for a Member School User account registered under ${memberSchool} has been REJECTED ${
            reason ? "for the following reason:" : "."
        }
        ${reason && `<br /><br /><em>${reason}</em>`}
        <br /><br />
        Here are the details of your account registration request: <br />
        <b>Name</b>: ${firstName} ${lastName} <br />
        <b>School</b>: ${memberSchool} <br />
        <b>School ID</b>: ${schoolId || ""} <br />
        <b>Mobile number</b>: ${mobileNumber} <br />
        <b>Email Address</b>: ${email} <br />
        <b>Account Type</b>: MS USER <br />
        <b>Status</b>: REJECTED <br />
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

export async function sendAdminRejectEmail(
    user: IUserRegistrationSchema,
    memberSchool: string
) {
    const { email, firstName, lastName, mobileNumber } = user;

    await transport.sendMail({
        subject: "Account Creation Denied",
        from: process.env.SERVICE_EMAIL,
        to: email,
        html: `
        Dear ${firstName} ${lastName}, 
        <br /><br />
        Greetings of Peace!
        <br /><br />
        Upon reviewing your C.O.R.E. account registration details, we regret to inform you that your registration for a Member School Admin account registered under ${memberSchool} has been REJECTED.
        <br /><br />
        Here are the details of your account registration request: <br />
        <b>Name</b>: ${firstName} ${lastName} <br />
        <b>School</b>: ${memberSchool} <br />
        <b>Mobile number</b>: ${mobileNumber} <br />
        <b>Email Address</b>: ${email} <br />
        <b>Account Type</b>: MS ADMIN <br />
        <b>Status</b>: REJECTED <br />
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

export async function sendUserRegisterNotif(
    registration: IUserRegistrationSchema,
    memberSchool: string
) {
    const { firstName, lastName, email, schoolId, mobileNumber } = registration;
    await transport.sendMail({
        subject: "Account Registration",
        from: process.env.SERVICE_EMAIL,
        to: email,
        html: `
        Dear ${firstName} ${lastName}, 
        <br /><br />
        Greetings of Peace!
        <br /><br />
        Please take note that your account registration is under the review of the vetting system of C.O.R.E. You will receive a confirmation email within three to five (3-5) working days regarding the status of your account registration. 
        <br /><br />
        Here are the details of your account registration request:<br />
        <b>Name</b>: ${firstName} ${lastName}<br />
        <b>School</b>: ${memberSchool}<br />
        <b>School ID</b>: ${schoolId || ""}<br />
        <b>Mobile number</b>: ${mobileNumber || ""}<br />
        <b>Email Address</b>: ${email}<br />
        <b>Account Type</b>: MS_USER<br />
        <b>Status</b>: PENDING
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
export async function sendAdminRegisterNotif(
    registration: IMSAdminRegistrationSchema,
    memberSchool: string
) {
    const { firstName, lastName, email, mobileNumber } = registration;
    await transport.sendMail({
        subject: "Account Registration",
        from: process.env.SERVICE_EMAIL,
        to: email,
        html: `
        Dear ${firstName} ${lastName}, 
        <br /><br />
        Greetings of Peace!
        <br /><br />
        Please take note that your account registration is under the review of the vetting system of C.O.R.E. You will receive a confirmation email within three to five (3-5) working days regarding the status of your account registration. 
        <br /><br />
        Here are the details of your account registration request:<br />
        <b>Name</b>: ${firstName} ${lastName}<br />
        <b>School</b>: ${memberSchool}<br />
        <b>Mobile number</b>: ${mobileNumber || ""}<br />
        <b>Email Address</b>: ${email}<br />
        <b>Account Type</b>: MS ADMIN<br />
        <b>Status</b>: PENDING
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

export async function sendNewCEAPUserEmail(
    receiver: IUserSchema,
    initialPassword: string = "random_password"
) {
    const { email, firstName, lastName, mobileNumber, accountType } = receiver;

    await transport.sendMail({
        subject: "Account Creation",
        from: process.env.SERVICE_EMAIL,
        to: email,
        html: `
        Dear ${firstName} ${lastName}, 
        <br /><br />
        Greetings of Peace!
        <br /><br />
        We are glad to inform you that CEAP has created a C.O.R.E. ${accountType} account for you.
        <br /><br />
        Here are the details of your account:<br />
        <b>Name</b>:  ${firstName} ${lastName}<br />
        <b>Mobile number</b>: ${mobileNumber || ""}<br />
        <b>Email Address</b>: ${email}<br />
        <b>Account Type</b>: ${accountType}
        <br /><br />
        Here are your C.O.R.E. login credentials and temporary password:<br />
        <b>Email</b>: ${email}<br />
        <b>Password</b>: ${initialPassword}
        <br /><br />
        You may change your temporary password in your account Profile once you have logged in.
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

export async function sendDeletedAccountNotif(
    receiver: IUserSchema,
    memberSchool?: string,
    isCeap: boolean = false,
    reason?: string
) {
    const { email, firstName, lastName, accountType, schoolId, mobileNumber } =
        receiver;
    await transport.sendMail({
        subject: "Account Deletion",
        from: process.env.SERVICE_EMAIL,
        to: email,
        html:
            `
        Dear ${firstName} ${lastName}, 
        <br /><br />
        Greetings of Peace!
        <br /><br />
        We would like to inform you that your C.O.R.E. ${accountType} account has been DELETED from the system ${
                reason ? "for the following reason:" : "."
            }
        
        ${reason && `<br /><br /><em>${reason}</em>`}
        <br /><br />
        Here are the details of your account:<br />
        <b>Name</b>: ${firstName} ${lastName}<br />` +
            (isCeap
                ? ""
                : `
        School: ${memberSchool}<br />
        School ID: ${schoolId || ""} <br />
        `) +
            `
        <b>Mobile number</b>: ${mobileNumber || ""}<br />
        <b>Email Address</b>: ${email}<br />
        <b>Account Type</b>: ${accountType}
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
