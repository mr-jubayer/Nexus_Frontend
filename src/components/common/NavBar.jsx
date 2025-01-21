import { Link } from "react-router";
import logo from "../../assets/logo2.png";
import BtnOutline from "../buttons/BtnOutline";
import FilledBtn from "../buttons/FilledBtn";
import Navlink from "../NavLink";
import { IoMenuSharp } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";
import { LuLogOut } from "react-icons/lu";
import { toast } from "react-hot-toast";
import useUserInfo from "../../hooks/useUserInfo";

function NavBar() {
  const { user, logoutUser } = useAuth();
  const { userInfo } = useUserInfo();
  const defaultRoutes = [
    { label: "Home", path: "/" },
    { label: "Add Articles", path: "/add-article" },
    { label: "All Articles", path: "/a" },
    { label: "My Articles ", path: "/e" },
    { label: "Subscription", path: "subscriptions" },
  ];

  if (userInfo?.role == "admin") {
    defaultRoutes.push({ label: "Dashboard ", path: "/dashboard" });
  }

  if (userInfo?.premiume) {
    defaultRoutes.push({ label: "Premium Articles ", path: "/h" });
  }

  const Links = () => (
    <ul className="flex lg:flex-row flex-col  lg:items-center">
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
          <img src={logo} alt="brand name" className="md:h-9 h-[24px]" />
        </div>
        <div>
          <div className="hidden lg:block">
            <Links />
          </div>
        </div>
        <div>
          {user ? (
            <div className="flex items-center">
              <BtnOutline
                onClick={logoutHandler}
                className="flex gap-2 text-lg items-center"
              >
                Logout <LuLogOut className="text-2xl" />
              </BtnOutline>
              <div className="avatar online cursor-pointer rounded-full">
                <div className="w-12 rounded-full">
                  <Link to={"profile"}>
                    <img src={userInfo.profilePhoto} alt="profile photo" />
                  </Link>
                </div>
              </div>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
