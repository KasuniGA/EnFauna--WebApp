// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9bggsG3MoaHqtDNkR28djxdNR0J-YNsQ",
  authDomain: "enfauna-project.firebaseapp.com",
  projectId: "enfauna-project",
  storageBucket: "enfauna-project.appspot.com",
  messagingSenderId: "714674163565",
  appId: "1:714674163565:web:0bea33d85570208769d464",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

export { app, auth, db }; // Export Firestore instance