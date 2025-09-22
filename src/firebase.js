import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyA_RbfgGSGjGj2kNcrSxqPb_aDIQjbTsps",
  authDomain: "canteeniq.firebaseapp.com",
  projectId: "canteeniq",
  storageBucket: "canteeniq.firebasestorage.app",
  messagingSenderId: "395391539469",
  appId: "1:395391539469:web:18b495a8845d01d14d7844",
  measurementId: "G-SRNDK9LQS5"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 