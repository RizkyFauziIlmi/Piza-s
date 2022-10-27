import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCecbbExfqnUN1-bDRpEgP3hmhbcbhtTss",
    authDomain: "piezoelektrikshoes.firebaseapp.com",
    projectId: "piezoelektrikshoes",
    storageBucket: "piezoelektrikshoes.appspot.com",
    messagingSenderId: "187759885427",
    appId: "1:187759885427:web:f3004d8204bef2a5e77e06",
    measurementId: "G-PWKFZTYW3E"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()