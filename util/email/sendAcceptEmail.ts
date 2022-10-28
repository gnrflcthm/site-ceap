import { IUserSchema } from "@db/index";
import transport from "./transport";


export async function sendAcceptEmail(receiver: IUserSchema, initialPassword: string = "random_password", sendCredentials: boolean = false) {
    const {
        firstName, lastName, email
    } = receiver;

    const subject = sendCredentials ? "Account Creation" : "Account Registration";

    await transport.sendMail({
        from: process.env.SERVICE_EMAIL,
        to: email,
        subject: subject,
        html: `
            <p>Hi ${firstName} ${lastName},</p>
            <br />
            <p>We have successfully created your account. To login to your account, you may use the following credntials:</p> 
            <p>
                <br />
                &#9; Email: <b>${email}</b>
                <br />
                &#9; Password: <b>${initialPassword}</b>
            </p>
            <br />
            <p>For further inquires please reach out to your local administrator.</p>
        `
    });
}
