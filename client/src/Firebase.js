import { initializeApp } from "firebase/app";
import 
{ getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signOut } from "firebase/auth";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJFaVrKcgpGFNypWXD6TMHRwJMQ_mhIII",
  authDomain: "moyastore-d4a35.firebaseapp.com",
  projectId: "moyastore-d4a35",
  storageBucket: "moyastore-d4a35.appspot.com",
  messagingSenderId: "650705517512",
  appId: "1:650705517512:web:0a4fd5f6948de73d6f1efd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const signUpWithEmailAndPassword = async (email, password) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    return user;
}

export const logInWithEmailAndPassword = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (res) {
      const user = res.user;
      return user;
    } 
};

export const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
    }
};

export const logout = async () => {
    await signOut(auth);
};
