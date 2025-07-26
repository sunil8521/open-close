// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1lJiqXKW--Qsaqh0k89Guh-62ujCRVrM",
  authDomain: "stx8521.firebaseapp.com",
  projectId: "stx8521",
  storageBucket: "stx8521.firebasestorage.app",
  messagingSenderId: "981648393072",
  appId: "1:981648393072:web:b332f431ee11f3d59505b5",
  measurementId: "G-CVRDHT2L8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };