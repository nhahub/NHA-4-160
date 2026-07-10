import { auth, db } from "../firebase/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";


// ==========================
// Register
// ==========================
export const register = async (
  name,
  email,
  password,
  role
) => {
  try {
    // Create account
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    const user = userCredential.user;

    // Save user info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      role,
      createdAt: serverTimestamp(),
    });

    return user;

  } catch (error) {
    throw error;
  }
};


// ==========================
// Login
// ==========================
export const login = async (
  email,
  password
) => {

  const userCredential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  const user = userCredential.user;

  // Get role
  const docSnap = await getDoc(
    doc(db, "users", user.uid)
  );

  return {
    user,
    role: docSnap.data().role,
  };
};


// ==========================
// Logout
// ==========================
export const logout = async () => {
  await signOut(auth);
};