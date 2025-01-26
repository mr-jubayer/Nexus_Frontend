import { Navigate, Outlet, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Spinner1 from "../components/spinners/Spinner1";
import useUserInfo from "../hooks/useUserInfo";

function AdminRoutes() {
  const { isLoading, userInfo } = useUserInfo();
  const { loading, user } = useAuth();
  const location = useLocation();

  if (loading || isLoading) {
    return <Spinner1 />;
  }

  if (userInfo.role === "admin") {
    return <Outlet />;
  }

  if (user) {
    return <Navigate to={"/"} />;
  }

  return <Navigate to={"/auth/login"} state={{ from: location.pathname }} />;
}

export default AdminRoutes;
