import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";

function PrivetRoutes({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (user) {
    return children;
  }

  return <Navigate to={"/auth/login"} state={{ from: location.pathname }} />;
}

export default PrivetRoutes;
