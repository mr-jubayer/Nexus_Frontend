/* eslint-disable react/prop-types */
import { NavLink } from "react-router";

function Navlink({ children = "NavLink", path = "/", className }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${
          isActive
            ? "text-green-600 font-bold lg:border-none border-l-4 border-myGreen lg:bg-transparent bg-green-100"
            : "lg:text-[#eaeaeae8] text-black  hover:text-green-600 lg:hover:bg-transparent hover:bg-green-100"
        } px-2 py-2 transition-all lg:text-sm text-base duration-200 ${className} flex items-center text-gray-700  transition-all duration-200 `
      }
    >
      {children}
    </NavLink>
  );
}

export default Navlink;
