import { Outlet } from "react-router";
import ReapopToaster from "../components/reapopToaster";
import PageLoader from "../components/spinners/PageLoader";
import useAuth from "../hooks/useAuth";
import SideBar from "../pages/dashboard/sidebar/SideBar";
import { useState } from "react";
import { FaBookReader, FaUser } from "react-icons/fa";
import { TbBrandSoundcloud } from "react-icons/tb";

const adminRoutes = [
  {
    path: "users",
    value: "Users",
    icon: <FaUser />,
  },
  {
    path: "articles",
    value: "articles",
    icon: <FaBookReader />,
  },
  {
    path: "add-publisher",
    value: "Add Publisher",
    icon: <TbBrandSoundcloud />,
  },
];

function DashboardLayout() {
  const [curentRoute, setCurrentRoute] = useState();
  const { loading } = useAuth();

  const settingRoute = (route) => {
    setCurrentRoute(route);
  };
  if (loading) return <PageLoader />;
  return (
    <div>
      <div className=" bg-gray-100 flex">
        <div>
          <SideBar adminRoutes={adminRoutes} settingRoute={settingRoute} />
        </div>

        {/* dynamic page */}
        <div className="max-w-7xl w-full  p-6 mx-auto">
          <div className="text-sm mb-6">
            <span className="text-gray-500">Dashboard /</span>{" "}
            <span className="font-semibold">Home</span>
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
