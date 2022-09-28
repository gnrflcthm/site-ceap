import { createTransport } from "nodemailer";

export default createTransport({
    service: "gmail",
    auth: {
        user: process.env.SERVICE_EMAIL,
        pass: process.env.SERVICE_EMAIL_PASSWORD,
    },
});
