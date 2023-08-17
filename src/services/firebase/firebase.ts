// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJnnhz78YtYKpegf6DwolxwLFJuASxoDM",
  authDomain: "blackgymfitsys.firebaseapp.com",
  projectId: "blackgymfitsys",
  storageBucket: "blackgymfitsys.appspot.com",
  messagingSenderId: "825026217042",
  appId: "1:825026217042:web:8cdbe99c56d31785944b8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
app;
analytics;