import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDnFBkOPMwSo7XPIbKR69gvcFrp5uUwLyA",
    authDomain: "smart-cart-be4cd.firebaseapp.com",
    projectId: "smart-cart-be4cd",
    storageBucket: "smart-cart-be4cd.appspot.com",
    messagingSenderId: "171192483195",
    appId: "1:171192483195:web:8fb89b4417bfc3a81c51de",
    measurementId: "G-6XX2KB605S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();
