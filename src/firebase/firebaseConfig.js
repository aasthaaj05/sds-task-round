// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqHJaHTDaGcr1OXuvvt5oYsRxgOrgl1AQ",
  authDomain: "celestial-geode-439016-j2.firebaseapp.com",
  projectId: "celestial-geode-439016-j2",
  storageBucket: "celestial-geode-439016-j2.appspot.com",
  messagingSenderId: "275223942969",
  appId: "1:275223942969:web:c5f706e4bf73a390a7fae8",
  measurementId: "G-3J7LMEQRVT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };