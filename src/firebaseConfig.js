import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6ol2xkjhqOREc4lciaU7E1qn0y7sjOVU",
  authDomain: "loginbase-2ed9b.firebaseapp.com",
  projectId: "loginbase-2ed9b",
  storageBucket: "loginbase-2ed9b.firebasestorage.app",
  messagingSenderId: "944156707143",
  appId: "1:944156707143:web:2c7ca0a973b5d48995a462",
  measurementId: "G-EER8S64BWG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

