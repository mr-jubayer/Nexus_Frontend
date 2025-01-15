/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUpWithEmailAndPassword = (email, pass) => {
    return;
  };
  const authMethods = {};
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
