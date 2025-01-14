import logo from "../../assets/logo2.png";
import Navlink from "../NavLink";

function NavBar() {
  return (
    <div>
      <div>
        <img src={logo} alt="brand name" className="h-11" />
      </div>
      <div>
        <Navlink>home </Navlink>
      </div>
    </div>
  );
}

export default NavBar;
