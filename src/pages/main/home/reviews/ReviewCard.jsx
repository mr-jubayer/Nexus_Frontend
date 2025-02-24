/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";

function ReviewCard({ review }) {
  return (
    <div className="my-2 md:mx-2  p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-1 text-indigo-600">
          {[...Array(review.rating)].map((_, i) => (
            <FaStar key={i} className="text-sm" />
          ))}
        </div>
        <div className="text-sm text-gray-400">{review.date}</div>
      </div>

      <p className="text-gray-800 text-base mb-5">{review.reviewText}</p>

      <div className="flex items-center gap-4">
        <img
          src={review.photo}
          className="h-14 w-14 object-cover rounded-full border border-gray-300"
          alt={`${review.name}'s profile`}
        />
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{review.name}</h3>
          <p className="text-sm text-gray-500">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
