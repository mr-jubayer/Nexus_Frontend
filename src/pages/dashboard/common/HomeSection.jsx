import { useState } from "react";
import useUserInfo from "../../../hooks/useUserInfo";
import { Divider } from "@mui/material";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { notify } from "reapop";

function HomeSection() {
  const { userInfo, refetch } = useUserInfo();
  const [submittedNumber, setSubmittedNumber] = useState(false);
  const [submittedAddress, setSubmittedAddress] = useState(false);
  const axiosSecure = useAxiosSecure();

  const handleAddNumber = async (e) => {
    e.preventDefault();

    const contactNumber = e.target.contactNumber.value;

    const { data } = await axiosSecure.patch(
      `/api/users/add-phone-number/${userInfo.email}`,
      {
        contactNumber,
      }
    );

    if (data.modifiedCount) {
      refetch();
      setSubmittedNumber(true);
      notify("Information updated");
    }
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    const address = e.target.address.value;

    const { data } = await axiosSecure.patch(
      `/api/users/add-address/${userInfo.email}`,
      {
        address,
      }
    );

    if (data.modifiedCount) {
      refetch();
      setSubmittedAddress(true);
      notify("Information updated");
    }
  };

  return (
    <>
      {/* about the user */}
      {!userInfo?.contactNumber || !userInfo?.address ? (
        <div className="bg-myGreen/5 p-2">
          <h2 className="mb-2">Please complete your profile below</h2>
          {!submittedNumber && !userInfo?.contactNumber && (
            <form
              onSubmit={handleAddNumber}
              className="flex  gap-2 items-center"
            >
              <input
                type="number"
                name="contactNumber"
                placeholder="Enter your contact number.."
                className={` py-2 text-sm px-2    rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
                required
              />
              <button className="bg-myGreen text-white text-sm px-3 py-2 ">
                Add
              </button>
            </form>
          )}
          {!submittedAddress && !userInfo?.address && (
            <form
              onSubmit={handleAddAddress}
              className="flex  gap-2 items-center mt-2"
            >
              <input
                type="text"
                name="address"
                placeholder="Enter your home address.."
                className={`py-2 text-sm px-2    rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
              />
              <button className="bg-myGreen text-white text-sm px-3 py-2 ">
                Add
              </button>
            </form>
          )}
        </div>
      ) : (
        ""
      )}

      {userInfo?.contactNumber || userInfo?.address ? (
        <div className="bg-myGreen/5 p-2 mt-4">
          <h2 className="mb-3 text-xl font-medium">Information</h2>
          {userInfo?.contactNumber && (
            <p>Contact Number: {userInfo?.contactNumber} </p>
          )}
          {userInfo?.address && <p>Home Address: {userInfo?.address} </p>}
        </div>
      ) : (
        ""
      )}
      {/* user Reading list */}
      <div className="bg-myGreen/5 p-2 mt-4">
        <h2 className="mb-3 text-xl font-medium">Reading List</h2>
        <Divider />
        <span className="mt-2 block" />
        <div>
          <p>No Story!</p>
        </div>
        {/* <div className="border p-1 flex gap-3">
          <div className="bg-myGreen h-16 w-24 " />
          <div>
            <h2 className="text-lg">Title of the Article</h2>
            <p> 234 views </p>
          </div>
        </div> */}
      </div>
    </>
  );
}

export default HomeSection;
