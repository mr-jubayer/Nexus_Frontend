import { useRef, useState } from "react";
import useUserInfo from "../../../hooks/useUserInfo";
import { FaFileUpload } from "react-icons/fa";
import uploadImg from "../../../utils/uploadImg";
import { ImSpinner9 } from "react-icons/im";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNotifications } from "reapop";
import BtnOutline from "../../../components/buttons/BtnOutline";
import { Link } from "react-router";
import HomeSection from "./HomeSection";

export default function Profile() {
  const { userInfo, refetch } = useUserInfo();
  const [activeTab, setActiveTab] = useState("Home");
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { notify } = useNotifications();

  const { fullName, profilePhoto, email } = userInfo || {};

  const handleUploadThumbnail = () => {
    inputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const newName = form.name.value;

    const img = inputRef?.current?.files[0];
    let upladedImage = {};

    if (img) {
      upladedImage = await uploadImg(img);
    } else {
      upladedImage.url = profilePhoto;
    }

    const { data } = await axiosSecure.patch(
      `/api/users/update/${userInfo.email}`,
      {
        fullName: newName,
        profilePhoto: upladedImage.url,
      }
    );

    if (data.modifiedCount) {
      refetch();
      setIsModalOpen(false);
      setLoading(false);
      notify("Profile Update.", "success");
    }
  };

  return (
    <div className="flex flex-col items-center py-8 px-4 mb-44">
      {/* Profile Section */}
      <div className="w-full max-w-3xl bg-white shadow-sm  p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <h1 className="text-2xl font-semibold">{fullName}</h1>
              <p className="text-gray-600">{email}</p>
            </div>
          </div>
          <button
            className="px-4 py-2 text-sm font-medium text-gray-800 border border-myGreen/40 hover:bg-myGreen/5"
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
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("Home")}
            >
              Home
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "About"
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600"
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
              <div className="bg-myGreen/5 py-8 flex items-center flex-col">
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  New Name
                </label>
                <input
                  type="text"
                  defaultValue={fullName}
                  name="name"
                  className={`py-2 text-xl px-3 mt-2   rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
                />
              </div>

              <div
                className={`flex items-center gap-3  py-3 text-xl px-6   rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
              >
                {/* hide it */}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={inputRef}
                />
                {/* on click button run input file */}
                <button
                  type={"button"}
                  className="flex  items-center gap-2 bg-myGreen rounded-sm px-3 py-1 text-lg text-white"
                  onClick={handleUploadThumbnail}
                >
                  Change Photo <FaFileUpload className="text-3xl" />
                </button>
              </div>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                  onClick={() => setIsModalOpen(false)} // Close modal
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-myGreen rounded-md hover:bg-myGreen"
                >
                  {loading ? (
                    <span>
                      <ImSpinner9 className="animate-spin duration-100 text-2xl " />
                    </span>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
