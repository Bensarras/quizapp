// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth, signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLxf2pP0ou9tw1Kl2M_FwyAyKWaPDNQa4",
  authDomain: "quizhoot-40dd2.firebaseapp.com",
  projectId: "quizhoot-40dd2",
  storageBucket: "quizhoot-40dd2.appspot.com",
  messagingSenderId: "386803450773",
  appId: "1:386803450773:web:37ddd8489d274f86e4ac9c",
  measurementId: "G-N0E9GHFBWZ",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(firebaseApp)


// Initialize Firebase Firestore and get a reference to the service
export const db = getFirestore(firebaseApp)