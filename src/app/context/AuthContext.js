'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign Up
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Log In
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Log In with Google
  function googleSignIn() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  // Log Out
  function logOut() {
    return signOut(auth);
  }

  // Update Profile Name
  function updateUserProfile(name) {
    return updateProfile(auth.currentUser, {
      displayName: name
    });
  }

  // Listen for user state changes (Logged In vs Out)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signUp,
    logIn,
    googleSignIn,
    logOut,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}