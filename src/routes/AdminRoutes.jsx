import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Spinner1 from "../components/spinners/Spinner1";

function AdminRoutes() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Spinner1 />;
  }

  if (user) {
    return <Outlet />;
  }

  return <Navigate to={"/auth/login"} state={{ from: location.pathname }} />;
}

export default AdminRoutes;
