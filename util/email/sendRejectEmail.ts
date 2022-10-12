import { MSAdminRegistration, UserRegistration } from "@prisma/client";
import transport from "./transport";

export async function sendRejectEmail(user: UserRegistration | MSAdminRegistration) {
    const { email, firstName, lastName } = user;
    await transport.sendMail({
        subject: "Account Creation Denied",
        from: process.env.SERVICE_EMAIL,
        to: email,
        html: `
            <p>Hi ${firstName} ${lastName},</p>
            <br />
            <p>Your request for account creation has been denied.</p>
            <br />
            <p>For further inquires please reach out to your local administrator.</p>
        `,
    });
}
