import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBv4VSdGaThXcmuXX7R8nDCVt4vNyqDfgY",
  authDomain: "tabs-d0c4e.firebaseapp.com",
  projectId: "tabs-d0c4e",
  storageBucket: "tabs-d0c4e.appspot.com",
  messagingSenderId: "528774709296",
  appId: "1:528774709296:web:89bf2fa88cae2e10d5edf5"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);