/* eslint-disable react/prop-types */

import { NavLink } from "react-router";

function Navlink({ children = "NavLink", path = "/", className }) {
  return (
    <div>
      <NavLink
        to={path}
        className={({ isActive }) =>
          `${
            isActive ? "text-[#1A8917] font-bold" : "hover-[#1b8917d5]"
          } transition-all duration-150 ${className}`
        }
      >
        {children}
      </NavLink>
    </div>
  );
}

export default Navlink;
