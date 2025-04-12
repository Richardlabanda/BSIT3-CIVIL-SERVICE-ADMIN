import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAoaXcBbdR9r0QgUvy99T07x5CAC_CE9Pc",
    authDomain: "miit-bsit3-civil-service-admin.firebaseapp.com",
    projectId: "miit-bsit3-civil-service-admin",
    storageBucket: "miit-bsit3-civil-service-admin.firebasestorage.app",
    messagingSenderId: "400166864835",
    appId: "1:400166864835:web:b30bdb44ae2beb623b9f76",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
