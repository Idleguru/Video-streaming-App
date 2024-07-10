import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBk3h3HYmOyQHNsu9xzeeDBfqfBKAwIC2I",
  authDomain: "netflix-24045.firebaseapp.com",
  projectId: "netflix-24045",
  storageBucket: "netflix-24045.appspot.com",
  messagingSenderId: "235317640209",
  appId: "1:235317640209:web:5a4c0a6be4396b0596c5b0",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore;

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast(error.code.split("/")[1].split("-").join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signup, login, logout };
