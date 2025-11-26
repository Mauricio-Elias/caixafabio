// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgklyGbyyF-LYSF6OfuV01kxLhkAFB4s0",
  authDomain: "caixa-seriemas.firebaseapp.com",
  projectId: "caixa-seriemas",
  storageBucket: "caixa-seriemas.firebasestorage.app",
  messagingSenderId: "587214326834",
  appId: "1:587214326834:web:ddc16f790b940ed87fc02b",
  measurementId: "G-15CS643Y8R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
