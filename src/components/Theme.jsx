import { useState } from "react";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import useTheme from "../hooks/useTheme";

function Theme() {
  const [showCard, setShowCard] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed z-[340000] bottom-4 right-4">
      {/* Settings Button */}
      <button
        className=" dark:bg-black2 p-3 rounded-full shadow-xl border dark:border-black2   bg-white "
        onClick={() => setShowCard((prev) => !prev)}
      >
        <IoMdSettings className=" text-2xl animate-[spin_10s_ease-in-out_infinite] text-myGreen" />
      </button>

      {/* Theme Toggle Card */}
      {showCard && (
        <div className="absolute bottom-12 p-3 right-0 bg-white dark:bg-blackNF  dark:text-white rounded-md shadow-md">
          <label className="swap swap-rotate rounded-full">
            {/* This hidden checkbox controls the state */}
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
            />

            {/* Light Mode Icon */}
            <MdOutlineLightMode className="swap-on text-4xl text-yellow-500" />

            {/* Dark Mode Icon */}
            <MdOutlineDarkMode className="swap-off text-4xl text-gray-800 dark:text-white" />
          </label>
        </div>
      )}
    </div>
  );
}

export default Theme;
