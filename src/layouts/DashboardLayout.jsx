import { Outlet, useLocation } from "react-router";
import ReapopToaster from "../components/reapopToaster";
import PageLoader from "../components/spinners/PageLoader";
import useAuth from "../hooks/useAuth";
import SideBar from "../pages/dashboard/sidebar/SideBar";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";

function DashboardLayout() {
  const { loading } = useAuth();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const routeName = location.pathname.split("/")[2];
  const modifiedRoute =
    routeName?.length > 1 &&
    routeName[0].toUpperCase().concat(routeName.slice(1));

  if (loading) return <PageLoader />;

  return (
    <div>
      <div className="  flex relative bg-gray-100 dark:bg-black1">
        <div className=" fixed top-0 left-0 h-screen z-50">
          <SideBar />
        </div>

        {/* dynamic page */}
        <div className="max-w-7xl w-full  md:p-6 p-3  mx-auto md:ml-64 2xl:ml-[330px]  min-h-screen">
          <div className="text-sm mb-6 md:pl-0 pl-8  flex justify-between">
            <div>
              <span className="text-gray-500 dark:text-darkHeading">
                Dashboard /
              </span>{" "}
              <span className="font-semibold dark:text-whiteGray">
                {modifiedRoute}
              </span>
            </div>
            {/* theme controller */}
            <div>
              {" "}
              <label className="swap swap-rotate rounded-full">
                {/* This hidden checkbox controls the state */}
                <input
                  type="checkbox"
                  checked={theme === "dark"}
                  onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
                />

                {/* Light Mode Icon */}
                <MdOutlineLightMode className="swap-on text-2xl text-yellow-500" />

                {/* Dark Mode Icon */}
                <MdOutlineDarkMode className="swap-off text-2xl text-gray-800 dark:text-white" />
              </label>
            </div>
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
