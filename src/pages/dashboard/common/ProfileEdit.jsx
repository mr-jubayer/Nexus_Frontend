import { useRef, useState } from "react";
import useUserInfo from "../../../hooks/useUserInfo";
import { FaFileUpload } from "react-icons/fa";
import uploadImg from "../../../utils/uploadImg";
import { ImSpinner9 } from "react-icons/im";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNotifications } from "reapop";

function ProfileEdit({ isModalOpen, setIsModalOpen }) {
  const { userInfo, refetch } = useUserInfo();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { notify } = useNotifications();

  const handleUploadThumbnail = () => {
    inputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const newName = form.name.value;
    const contactNumber = form?.contactNumber?.value;
    const address = form?.address?.value;

    const img = inputRef?.current?.files[0];
    let upladedImage = {};

    if (img) {
      upladedImage = await uploadImg(img);
    } else {
      upladedImage.url = userInfo.profilePhoto;
    }

    const updatedData = {};

    if (address) {
      updatedData.address = address;
    }
    if (contactNumber) {
      updatedData.contactNumber = contactNumber;
    }
    if (userInfo.profilePhoto !== upladedImage.url) {
      updatedData.profilePhoto = upladedImage.url;
    }
    if (userInfo.fullName !== newName) {
      updatedData.fullName = newName;
    }

    const { data } = await axiosSecure.patch(
      `/api/users/update/${userInfo.email}`,
      updatedData
    );

    if (data.modifiedCount) {
      refetch();
      setIsModalOpen(false);
      setLoading(false);
      notify("Profile Update.", "success");
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="text"
                  defaultValue={userInfo.fullName}
                  name="name"
                  className={`py-1 text-lg px-3 mt-2   rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
                />
                {userInfo.contactNumber && (
                  <input
                    type="number"
                    defaultValue={userInfo.contactNumber}
                    name="contactNumber"
                    className={`py-1 text-lg px-3 mt-2   rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
                  />
                )}
                {userInfo.address && (
                  <input
                    type="text"
                    defaultValue={userInfo.address}
                    name="address"
                    className={`py-1 text-lg px-3 mt-2   rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
                  />
                )}
              </div>

              <div
                className={`flex items-center gap-3  py-2 text-lg px-3    w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
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
                  className="flex  items-center gap-2 bg-myGreen  px-3 py-1 text-lg text-white"
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

export default ProfileEdit;
