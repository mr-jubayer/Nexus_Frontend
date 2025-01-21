/* eslint-disable react/prop-types */
import { Divider } from "@mui/material";

export default function MainArticleCard({ article }) {
  const {
    authorInfo,
    title,
    description,
    tags,
    publisher,
    creationTime,
    thumbnail,
    status,
    isPremium,
  } = article || {};

  const time = new Date(creationTime).toLocaleDateString();

  return (
    <div
      className={`${isPremium ? "border-2 border-purple-600" : ""} max-w-lg mx-auto border bg-white/50 rounded-lg shadow-sm overflow-hidden `}
    >
      {/* Header */}
      <div className="flex p-4 border-b justify-between">
        <div className="flex items-center">
          <img
            src={authorInfo.profilePhoto || "https://via.placeholder.com/40"}
            alt={authorInfo.fullName || "Author"}
            className="w-12 h-12 rounded-full mr-4"
          />

          <div>
            <p className="font-bold">{authorInfo.fullName}</p>
            <p className="text-sm">{authorInfo.email}</p>
          </div>
        </div>
        <div className="self-start text-xs ">
          <p>{time} </p>
        </div>
      </div>

      {/* Thumbnail */}
      <div className="relative">
        <img
          src={thumbnail}
          alt="Article Thumbnail"
          className="w-full h-48 object-cover"
        />
        {isPremium && (
          <div className="px-3 py-1 bg-purple-600 text-white absolute top-0 right-0 rounded-none">
            Premiume
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-700 mb-2">
          {description.length > 120
            ? `${description.slice(0, 120)}...`
            : description}
        </p>
        <Divider />
        <p className="text-sm text-gray-500 mt-3 ">
          <strong>Tags:</strong>{" "}
          {tags.length ? tags.map((tag) => `#${tag.label} `) : "No tags"}
        </p>
        <p className="text-sm font-medium my-1">
          <strong>Status:</strong>{" "}
          <span
            className={`${
              status === "published" ? "text-green-600" : "text-orange-500"
            } font-bold`}
          >
            {status}
          </span>
        </p>
        <p className="text-sm text-gray-500">{`Publisher: ${publisher.value}`}</p>
      </div>
    </div>
  );
}
