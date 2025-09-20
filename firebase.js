// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfXmG9jSY8bSInTWkBHTM438ZeiL3RX_w",
  authDomain: "my-auth-app-3e9c2.firebaseapp.com",
  projectId: "my-auth-app-3e9c2",
  storageBucket: "my-auth-app-3e9c2.firebasestorage.app",
  messagingSenderId: "405230905196",
  appId: "1:405230905196:web:72c44794720238784f3549",
  measurementId: "G-SG6KVSYNCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase services
export const analytics = getAnalytics(app); // optional
export const auth = getAuth(app);           // for authentication
export const db = getFirestore(app);        // for Firestore database
