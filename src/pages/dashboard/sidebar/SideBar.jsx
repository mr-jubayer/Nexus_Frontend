import { NavLink } from "react-router";
import logo from "../../../assets/logo2.png";

export default function SideBar({ adminRoutes }) {
  return (
    <aside className="w-64 bg-white shadow-md h-screen">
      <div className="p-4 border-b border-gray-200">
        <img src={logo} alt="brand name" className="md:h-9 h-[24px]" />
      </div>
      <nav className="mt-4 space-y-2">
        {adminRoutes.map((route) => (
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

        <div className="mt-4 border-t pt-4 border-gray-200"></div>
      </nav>
    </aside>
  );
}
