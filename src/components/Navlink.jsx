/* eslint-disable react/prop-types */

import { NavLink } from "react-router";

function Navlink({ children = "NavLink", path = "/", className }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${
          isActive
            ? "text-[#1A8917] font-bold hover:text-white"
            : "hover:text-white"
        } transition-all px-5 py-6 group relative  duration-150 ${className}`
      }
    >
      <span className="h-0 w-full absolute bottom-0 left-0 -z-10 bg-yellow-600 group-hover:h-full transition-all duration-300"></span>
      {children}
    </NavLink>
  );
}

export default Navlink;
