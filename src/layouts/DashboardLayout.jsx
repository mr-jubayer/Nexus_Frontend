import { Outlet, useLocation } from "react-router";
import ReapopToaster from "../components/reapopToaster";
import PageLoader from "../components/spinners/PageLoader";
import useAuth from "../hooks/useAuth";
import SideBar from "../pages/dashboard/sidebar/SideBar";

function DashboardLayout() {
  const { loading } = useAuth();
  const location = useLocation();
  const routeName = location.pathname.split("/")[2];
  const modifiedRoute =
    routeName?.length > 1 &&
    routeName[0].toUpperCase().concat(routeName.slice(1));

  if (loading) return <PageLoader />;

  return (
    <div>
      <div className="  flex relative bg-gray-100">
        <div className=" fixed top-0 left-0 h-screen z-50">
          <SideBar />
        </div>

        {/* dynamic page */}
        <div className="max-w-7xl w-full  md:p-6 p-3  mx-auto md:ml-64 2xl:ml-[330px]  min-h-screen">
          <div className="text-sm mb-6 md:pl-0 pl-8 ">
            <span className="text-gray-500">Dashboard /</span>{" "}
            <span className="font-semibold">{modifiedRoute}</span>
          </div>
          <Outlet />
        </div>
      </div>
      {/* toaster */}
      <ReapopToaster />
    </div>
  );
}
export default DashboardLayout;
