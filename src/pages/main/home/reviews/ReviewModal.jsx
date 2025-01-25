import { useState } from "react";
import FilledBtn from "../../../../components/buttons/FilledBtn";
import useUserInfo from "../../../../hooks/useUserInfo";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNotifications } from "reapop";

export default function ReviewModal({ refetch }) {
  return (
    <div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <ModalBox refetch={refetch} />
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModalBox({ refetch }) {
  const [rated, setRated] = useState(0);
  const [review, setReview] = useState("");
  const { userInfo } = useUserInfo();
  const axiosSecure = useAxiosSecure();
  const { notify } = useNotifications();

  const handleStarClick = (rating) => {
    setRated(rating);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      name: userInfo.fullName,
      photo: userInfo.profilePhoto,
      reviewText: review,
      role:
        userInfo.premiumeToken > 0 || userInfo.role === "admin"
          ? "Premiume User"
          : "Normal User",
      date: new Date().toLocaleDateString(),
      rating: rated,
    };

    const { data } = await axiosSecure.post(`/api/reviews`, reviewData);
    if (data.insertedId) {
      notify("Review added success.", "success");
      refetch();
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold  mb-3">
            Please write a clear and polite text
          </h2>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Custom Star Rating */}
            <div className="flex items-center gap-4">
              <label
                htmlFor="rating"
                className="text-sm font-medium text-gray-900"
              >
                Rating:
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    onClick={() => handleStarClick(star)}
                    className={`cursor-pointer text-3xl ${
                      rated >= star ? "text-yellow-500" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

            {/* Review Textarea */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="review"
                  className="block text-sm font-medium text-gray-900"
                >
                  Write here:
                </label>
              </div>
              <div className="mt-2">
                <textarea
                  id="review"
                  name="review"
                  cols={10}
                  rows={5}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  required
                  className={`block px-2 py-1 rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
                ></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              {review ? (
                <FilledBtn className="w-full">
                  <label
                    className="rounded-none cursor-pointer flex w-full justify-center  bg-myGreen px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-myGreen/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mygbg-myGreen"
                    htmlFor="my_modal_6"
                  >
                    Submit
                  </label>
                </FilledBtn>
              ) : (
                <FilledBtn
                  type="submit"
                  className=" rounded-none flex w-full justify-center  bg-gray-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mygbg-myGreen"
                >
                  Submit
                </FilledBtn>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
