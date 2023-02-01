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

async function signUpUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            // Save to DB
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log({errorCode, errorMessage})
        });
}

export const signUpWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await signUpUser(email, password);
      const user = res.user;
      
    } catch (err) {
      console.error(err);
    }
};

async function signInUser (email, password) {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log({errorCode, errorMessage})
        });
}

export const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInUser(email, password);
    } catch (err) {
      console.error(err);
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

export const logout = () => {
    try {
        signOut(auth)
    } catch(err) {
        console.error(err);
    };
};
