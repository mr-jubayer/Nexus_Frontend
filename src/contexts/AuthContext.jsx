/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUpWithEmailAndPassword = (email, pass) => {
    return createUserWithEmailAndPassword(auth, email, pass);
  };
  const authMethods = {
    user,
    loading,
    signUpWithEmailAndPassword,
  };

  useEffect(() => {
    const clearObserver = onAuthStateChanged(auth, (userCredential) => {
      setUser(userCredential);
      setLoading(false);
      console.log(userCredential);
    });

    return () => clearObserver;
  }, []);
  return (
    <AuthContext.Provider value={authMethods}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
