import { initializeApp, FirebaseOptions, getApps, getApp } from "firebase/app";

const config: FirebaseOptions = {
    apiKey: "AIzaSyBdJ524VCnyMSRR9PuKXP_nKhNyG8RT1ag",
    authDomain: "site-ceap-63527.firebaseapp.com",
    projectId: "site-ceap-63527",
    storageBucket: "site-ceap-63527.appspot.com",
    messagingSenderId: "441583308599",
    appId: "1:441583308599:web:c382aa1eb3fe684d1154b2",
};

if (!getApps().length) {
    initializeApp(config);
}

const defaultApp = getApp();

export default defaultApp;