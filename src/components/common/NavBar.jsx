import { Link } from "react-router";
import logo from "../../assets/logo2.png";
import BtnOutline from "../buttons/BtnOutline";
import FilledBtn from "../buttons/FilledBtn";
import Navlink from "../NavLink";
import { IoMenuSharp } from "react-icons/io5";

function NavBar() {
  const defaultRoutes = [
    { label: "Home", path: "/" },
    { label: "Subscription", path: "/s" },
    { label: "All Articles", path: "/a" },
    { label: "Dashboard ", path: "/v" },
    { label: "My Articles ", path: "/e" },
    { label: "Premium Articles ", path: "/h" },
  ];

  const Links = () => (
    <ul className="flex lg:flex-row flex-col gap-8 lg:items-center">
      {defaultRoutes.map((route) => (
        <Navlink key={route.label} className={"lg:bg-white"} path={route.path}>
          {route.label}
        </Navlink>
      ))}
    </ul>
  );

  return (
    <nav>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="drawer lg:hidden">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content p-1 active:scale-95 transition-all text-3xl z-50">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="cursor-pointer">
                <IoMenuSharp />
              </label>
            </div>
            <div className="drawer-side  z-50">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 ">
                <Links className={""} />
              </ul>
            </div>
          </div>
          <img src={logo} alt="brand name" className="md:h-10 h-[26px]" />
        </div>
        <div>
          <div className="hidden lg:block">
            <Links />
          </div>
        </div>
        <div>
          <div>
            <Link to={"/auth/login"}>
              {" "}
              <BtnOutline>Login</BtnOutline>
            </Link>
            <Link to={"/auth/signup"}>
              <FilledBtn className="bg-myGreen text-white hover:bg-myGreen/90">
                Sign Up
              </FilledBtn>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
