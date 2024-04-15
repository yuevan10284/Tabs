import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBv4VSdGaThXcmuXX7R8nDCVt4vNyqDfgY",
  authDomain: "tabs-d0c4e.firebaseapp.com",
  databaseURL: "https://tabs-d0c4e-default-rtdb.firebaseio.com",
  projectId: "tabs-d0c4e",
  storageBucket: "tabs-d0c4e.appspot.com",
  messagingSenderId: "528774709296",
  appId: "1:528774709296:web:89bf2fa88cae2e10d5edf5",
  measurementId: "G-YGP42X8QMY"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const DATABASE = getDatabase(app);
const FIRESTORE_DB = getFirestore(app);
const FIREBASE_AUTH = getAuth(app);

export { DATABASE, FIRESTORE_DB, FIREBASE_AUTH };