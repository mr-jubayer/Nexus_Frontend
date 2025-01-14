/* eslint-disable react/prop-types */

import { NavLink } from "react-router";

function Navlink({ children = "NavLink", path = "/" }) {
  return (
    <div>
      <NavLink to={path} className={({ isActive }) => `${isActive ? "" : ""}`}>
        {children}
      </NavLink>
    </div>
  );
}

export default Navlink;
