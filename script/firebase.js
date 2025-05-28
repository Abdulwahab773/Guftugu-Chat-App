import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, sendEmailVerification, deleteUser, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js"
import { getFirestore, collection, addDoc, doc, setDoc, Timestamp, updateDoc, query, where, onSnapshot, getDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyDWcV5LNydc-SB6aq2STnnrlDOCLQsq_VU",
    authDomain: "guftugu-chat-app.firebaseapp.com",
    projectId: "guftugu-chat-app",
    storageBucket: "guftugu-chat-app.firebasestorage.app",
    messagingSenderId: "999168365048",
    appId: "1:999168365048:web:a77625c1e87f922545c60d",
    measurementId: "G-PXDRQPY76T"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);


export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    sendEmailVerification,
    deleteUser,
    provider,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    collection,
    addDoc,
    doc,
    setDoc,
    Timestamp,
    updateDoc,
    db,
    query,
    where,
    onSnapshot,
    getDoc,
    getDocs 
}