import { Link, useNavigate } from "react-router";
import BtnOutline from "../buttons/BtnOutline";
import FilledBtn from "../buttons/FilledBtn";
import Navlink from "../NavLink";
import useAuth from "../../hooks/useAuth";
import { LuLogOut } from "react-icons/lu";
import { toast } from "react-hot-toast";
import useUserInfo from "../../hooks/useUserInfo";
import { useEffect, useRef, useState } from "react";
import PhoneDrawer from "./PhoneDrawer";
import { MdOutlineMenu } from "react-icons/md";
import BrandLogo2 from "../BrandLogo2";

function NavBar() {
  const { user, logoutUser } = useAuth();
  const { userInfo } = useUserInfo();
  const [shadow, setShadow] = useState(false);
  const defaultRoutes = [
    { label: "Home", path: "/" },
    { label: "All Articles", path: "all-articles" },
  ];
  const asideRef = useRef();

  useEffect(() => {
    const handleSroll = () => {
      // console.log(window.scrollY);

      if (window.scrollY > 50) {
        setShadow(true);
      } else {
        setShadow(false);
      }
    };
    window.addEventListener("scroll", handleSroll);
  }, []);

  if (user) {
    defaultRoutes.push(
      { label: "Add Articles", path: "add-article" },
      { label: "My Articles ", path: "/my-articles" },
      { label: "Subscription", path: "subscriptions" },
      { label: "Dashboard ", path: "/dashboard/root" }
    );
  }

  if (userInfo?.premiumeToken || userInfo?.role === "admin") {
    defaultRoutes.push({
      label: "Premium Articles ",
      path: "premiume-articles",
    });
  }

  if (!user) {
    defaultRoutes.push({ label: "Contact Us", path: "contact" });
  }

  const Links = () => (
    <ul className="flex lg:flex-row flex-col  lg:items-center ">
      {defaultRoutes.map((route) => (
        <Navlink key={route.label} path={route.path}>
          {route.label}
        </Navlink>
      ))}
    </ul>
  );

  const logoutHandler = () => {
    const logginOut = (id) => {
      toast.promise(logoutUser(), {
        loading: "Processing...",
        success: <b>Logout Successfull!</b>,
        error: <b>Logout failed.</b>,
      });
      toast.dismiss(id);
    };

    toast((t) => (
      <span>
        Are you <b>sure</b>?
        <button
          onClick={() => toast.dismiss(t.id)}
          className="bg-gray-400 px-3 py-1 rounded-md shadow-inner mx-3 text-white"
        >
          no
        </button>
        <button
          onClick={() => logginOut(t.id)}
          className="bg-orange-400 px-3 py-1 rounded-md shadow-inner  text-white"
        >
          yes
        </button>
      </span>
    ));
  };

  const handleSidebar = () => {
    // show sidebar
    asideRef.current.classList.remove("-translate-x-72");
  };
  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-blackNF shadow-sm ${shadow && "shadow-lg"}  `}
    >
      <div className="flex items-center justify-between  w-full py-2  max-w-7xl mx-auto lg:px-20 md:px-10 px-3 z-20 ">
        {/*  */}
        <button
          onClick={handleSidebar}
          className=" text-white text-xl  lg:hidden"
        >
          <MdOutlineMenu />
        </button>
        {/* brand name */}
        <div className="flex items-center gap-1">
          {/* brand name */}
          <BrandLogo2 />
        </div>
        {/* desktop navigation  bar */}
        <div className="hidden lg:block">
          <Links />
        </div>
        {/* profile and login/logout btns */}
        <div>
          {user ? (
            <div className="flex items-center ">
              <button
                onClick={logoutHandler}
                className="flex gap-2 text-base items-center  mr-3"
              >
                <LuLogOut className="text-xl text-white/85" />
              </button>
              <div className="avatar online cursor-pointer rounded-full">
                <div className="w-8 rounded-full">
                  <Link to={"/dashboard/profile"}>
                    <img src={userInfo?.profilePhoto} alt="profile photo" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Link to={"/auth/login"}>
                <button className="text-white  text-sm px-2">Login</button>
              </Link>
              <Link to={"/auth/signup"}>
                <FilledBtn className="bg-myGreen text-white hover:bg-myGreen/90 text-sm">
                  Sign Up
                </FilledBtn>
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* mobile drawer  */}
      <PhoneDrawer Links={Links} asideRef={asideRef} />
    </nav>
  );
}

export default NavBar;
