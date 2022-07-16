import * as firebaseAdmin from "firebase-admin/app";

// import { client_email, private_key, project_id } from "./serviceAccount.json";

if (!firebaseAdmin.getApps().length) {
    firebaseAdmin.initializeApp({
        credential: firebaseAdmin.cert({
            clientEmail: process.env.ADMIN_CLIENT_EMAIL,
            privateKey: process.env.ADMIN_PRIVATE_KEY,
            projectId: process.env.ADMIN_PROJECT_ID,
        }),
    });
}

export default firebaseAdmin;
