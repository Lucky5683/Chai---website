// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGqUDYOALXTjyAGEcw4q4XAaSEVCDE3Ag",
  authDomain: "mystore-32f4c.firebaseapp.com",
  projectId: "mystore-32f4c",
  storageBucket: "mystore-32f4c.firebasestorage.app",
  messagingSenderId: "476881423071",
  appId: "1:476881423071:web:11cf122e551a07b842f76a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const db = getFirestore(app);
export const auth = getAuth(app);
