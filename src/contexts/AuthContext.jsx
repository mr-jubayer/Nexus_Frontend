/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import useAxiosSecure from "../hooks/useAxiosSecure";
const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  const signUpWithEmailAndPassword = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const signInWithEmailAndPass = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };
  const authMethods = {
    user,
    loading,
    signUpWithEmailAndPassword,
    signInWithEmailAndPass,
    googleLogin,
    logoutUser,
  };

  useEffect(() => {
    const clearObserver = onAuthStateChanged(auth, async (userCredential) => {
      setUser(userCredential);
      setLoading(false);

      if (userCredential) {
        if (!localStorage.getItem("access-token")) {
          const { data } = await axiosSecure.post(`/jwt/api/create`, {
            id: userCredential.uid,
            email: userCredential.email,
          });
          localStorage.setItem("access-token", data.token);
        }
      } else {
        // logout remove token
        if (localStorage.getItem("access-token")) {
          localStorage.removeItem("access-token");
        }
      }
      console.log(userCredential);
    });

    return () => clearObserver;
  }, []);
  return (
    <AuthContext.Provider value={authMethods}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
