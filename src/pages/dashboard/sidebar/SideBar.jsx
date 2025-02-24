import { NavLink, useLocation, useNavigate } from "react-router";
import logo from "../../../assets/logob.png";
import { MdDashboard, MdOutlineMenu } from "react-icons/md";
import { FaBookReader, FaHome, FaUser } from "react-icons/fa";
import { TbBrandSoundcloud } from "react-icons/tb";
import { useEffect, useRef } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { Helmet } from "react-helmet-async";
import useUserInfo from "../../../hooks/useUserInfo";
import BrandLogo1 from "../../../components/BrandLogo1";

export default function SideBar() {
  const asideRef = useRef();
  const loc = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();

  useEffect(() => {
    if (loc.pathname === "/dashboard") navigate("/dashboard/root");
  }, [loc.pathname]);

  const DashboardRoutes = [
    {
      path: "/dashboard/root",
      value: "Dashboard",
      icon: <MdDashboard />,
    },
  ];

  if (userInfo?.role === "admin") {
    DashboardRoutes.push(
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
      }
    );
  }

  DashboardRoutes.push({
    path: "profile",
    value: "Profile",
    icon: <TbBrandSoundcloud />,
  });

  const defaultRoute = [
    {
      path: "/",
      value: "Home",
      icon: <FaHome />,
    },
  ];

  const handleSidebar = () => {
    // show sidebar
    asideRef.current.classList.remove("-translate-x-72");
  };
  const closeSlideBar = () => {
    // hide sidebar
    asideRef.current.classList.add("-translate-x-72");
  };

  return (
    <div className="relative h-full ">
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="/dashboardfav.png" />
        <title>Nexus | DashBoard</title>
      </Helmet>
      <button
        className="text-xl cursor-pointer md:hidden top-2 left-2 rounded-md absolute hover:bg-slate-100 focus:bg-slate-200 transition-all duration-200 p-1"
        onClick={handleSidebar}
      >
        <MdOutlineMenu />
      </button>
      <aside
        ref={asideRef}
        className="transition-all duration-300 w-64 bg-white md:shadow-md shadow-2xl h-full md:relative  fixed top-0 left-0  md:-translate-x-0 -translate-x-72"
      >
        <div className="p-4 border-b border-gray-200 flex justify-between">
          <BrandLogo1 />
          <button onClick={closeSlideBar} className="md:hidden">
            <MdOutlineArrowBackIosNew className="text-xl" />
          </button>
        </div>
        <nav className="mt-4 space-y-2">
          {DashboardRoutes.map((route) => (
            <NavLink
              key={route.value}
              to={route.path}
              className={({ isActive }) =>
                `${isActive ? "border-l-4 bg-green-100" : ""} flex items-center px-4 py-2 text-gray-700 hover:bg-green-100 transition-all duration-200 border-l-green-600  gap-2 `
              }
            >
              <span>{route.icon}</span>
              {route.value}
            </NavLink>
          ))}

          <div className="mt-4 border-t pt-4 border-gray-200">
            {defaultRoute.map((route) => (
              <NavLink
                key={route.value}
                to={route.path}
                className={({ isActive }) =>
                  `${isActive ? "border-l-4 bg-green-100" : ""} flex items-center px-4 py-2 text-gray-700 hover:bg-green-100 transition-all duration-200 border-l-green-600  gap-2 `
                }
              >
                <span>{route.icon}</span>
                {route.value}
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>
    </div>
  );
}
