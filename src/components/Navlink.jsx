/* eslint-disable react/prop-types */
import { NavLink } from "react-router";

function Navlink({ children = "NavLink", path = "/", className }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${
          isActive
            ? "text-myGreen font-bold"
            : "text-gray-600 hover:text-myGreen"
        } px-4 py-2 transition-all duration-200 ${className}`
      }
    >
      {children}
    </NavLink>
  );
}

export default Navlink;
