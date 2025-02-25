import { MdOutlineArrowBackIosNew } from "react-icons/md";
import BrandLogo1 from "../BrandLogo1";

function PhoneDrawer({ Links, asideRef }) {
  const closeSlideBar = () => {
    // hide sidebar
    asideRef.current.classList.add("-translate-x-72");
  };
  return (
    <>
      <div
        ref={asideRef}
        className="absolute top-0 transition-all duration-300 left-0  lg:-translate-x-0 -translate-x-72 md:shadow-md shadow-2xl lg:hidden block  bg-white dark:bg-black2"
      >
        <aside className="   w-64   h-screen">
          <div className="flex justify-between p-3">
            <BrandLogo1 />
            <button onClick={closeSlideBar}>
              <MdOutlineArrowBackIosNew className="text-xl text-black  dark:text-darkHeading" />
            </button>
          </div>

          <div className="border-t border-t-whiteGray/40 pt-4">
            <Links />
          </div>
        </aside>
      </div>
    </>
  );
}

export default PhoneDrawer;
