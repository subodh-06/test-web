import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzNrk4XZsNE2w0zr9-Dwm6P2obqDMV5NI",
    authDomain: "my-website-f6cba.firebaseapp.com",
    projectId: "my-website-f6cba",
    storageBucket: "my-website-f6cba.appspot.com",
    messagingSenderId: "694279107065",
    appId: "1:694279107065:web:6c35160aeac2ab237acd28"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Function to create a new user
export const createUser = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date()
    });
    return user;
};

// Function to sign in a user
export const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
};

// Function to sign out the user
export const logout = async () => {
    await signOut(auth);
};

// Function to update user profile
export const updateUserProfile = async (userId, profileData) => {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, profileData);
};

// Function to get user profile
export const getUserProfile = async (userId) => {
    const userDoc = doc(db, "users", userId);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log("No such document!");
        return null;
    }
};
