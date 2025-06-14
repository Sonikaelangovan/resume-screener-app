
// lib/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2Bj9fjndCrDIR2dmONdFWMf8GCOXEwGM",
  authDomain: "resume-screener-app-14cf3.firebaseapp.com",
  projectId: "resume-screener-app-14cf3",
  storageBucket: "resume-screener-app-14cf3.firebasestorage.app",
  messagingSenderId: "269980630639",
  appId: "1:269980630639:web:a9bfe5f2f6101a03b2179a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
