// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Firestore
import { getDatabase } from "firebase/database";   // Realtime Database

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9bggsG3MoaHqtDNkR28djxdNR0J-YNsQ",
  authDomain: "enfauna-project.firebaseapp.com",
  projectId: "enfauna-project",
  storageBucket: "enfauna-project.appspot.com",
  messagingSenderId: "714674163565",
  appId: "1:714674163565:web:0bea33d85570208769d464",
  databaseURL: "https://enfauna-project-default-rtdb.firebaseio.com/", 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);        // Firestore
const rtdb = getDatabase(app);       // Realtime Database ✅

export { app, auth, db, rtdb };      // ✅ Export rtdb too
