"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig"; // Import your Firebase auth instance
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to the Firebase authentication state
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    // Unsubscribe on cleanup
    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  const setUserData = (userData) => setUser(userData); // Add setUserData method

  return (
    <AuthContext.Provider value={{ user, logout, loading, setUserData }}>
      {!loading && children} {/* Render children only when loading is done */}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
