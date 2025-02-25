import { useState } from "react";
import useUserInfo from "../../../hooks/useUserInfo";
import BtnOutline from "../../../components/buttons/BtnOutline";
import { Link } from "react-router";
import HomeSection from "./HomeSection";
import ProfileEdit from "./ProfileEdit";

export default function Profile() {
  const { userInfo } = useUserInfo();
  const [activeTab, setActiveTab] = useState("Home");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { fullName, profilePhoto, email } = userInfo || {};

  return (
    <div className="flex flex-col items-center py-8 px-4 mb-44">
      {/* Profile Section */}
      <div className="w-full max-w-3xl bg-white dark:bg-black2 shadow-sm  p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={profilePhoto}
              alt="Profile"
              className="md:w-20 w-12 aspect-square  rounded-full object-cover"
            />
            <div>
              <h1 className="md:text-2xl text-xl font-semibold dark:text-darkHeading">
                {fullName}
              </h1>
              <p className="text-gray-600 md:text-base text-sm dark:text-whiteGray">
                {email}
              </p>
            </div>
          </div>
          <button
            className="px-4 py-2 text-sm font-medium text-gray-800 border border-myGreen/40 dark:border-whiteGray dark:text-white hover:bg-myGreen/5"
            onClick={() => setIsModalOpen(true)} // Open modal
          >
            Edit Profile
          </button>
        </div>

        {/* Tabs Section */}
        <div className="mt-8">
          <div className="flex border-b border-gray-300">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "Home"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600 dark:text-whiteGray"
              }`}
              onClick={() => setActiveTab("Home")}
            >
              Home
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "About"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600 dark:text-whiteGray"
              }`}
              onClick={() => setActiveTab("About")}
            >
              About
            </button>
          </div>

          {/* Tab Panels */}
          <div className="mt-4">
            {activeTab === "Home" && (
              <div>
                <HomeSection />
              </div>
            )}
            {activeTab === "About" && (
              <div className="bg-myGreen/5  py-8 flex items-center flex-col">
                <h2 className="text-xl text-center font-semibold">
                  Tell the world about yourself
                </h2>
                <p className="px-5 py-2 text-sm text-center">
                  Here’s where you can share more about yourself: your history,
                  work experience, accomplishments, interests, dreams, and more.
                </p>
                <Link to={"/add-article"}>
                  {" "}
                  <BtnOutline className="mt-3">Get Started</BtnOutline>{" "}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ProfileEdit isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
