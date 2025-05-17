import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP57eEgodSnCJY23vA6IaulP6n9WMPllU",
  authDomain: "syvlan.firebaseapp.com",
  projectId: "syvlan",
  storageBucket: "syvlan.firebasestorage.app",
  messagingSenderId: "406890275656",
  appId: "1:406890275656:web:b1944562051b63c123497d",
  measurementId: "G-533WM2Y7LH"
};

// Initialize Firebase only once
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Email auth functions
export const loginWithEmail = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const registerWithEmail = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Google auth
export const signInWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

// Phone auth is more complex in web SDK and requires additional setup

// Sign out
export const logoutUser = () => {
  return signOut(auth);
};

// Export auth instance and functions
export { auth, onAuthStateChanged }; 