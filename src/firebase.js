// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwkYll_sG5xcy7OxESShIsyMmZgSdI9q4",
  authDomain: "fearleocke.firebaseapp.com",
  projectId: "fearleocke",
  storageBucket: "fearleocke.firebasestorage.app",
  messagingSenderId: "905846178624",
  appId: "1:905846178624:web:755e803c7679f57cc7b0a5",
  measurementId: "G-DWHX7V7MKJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();