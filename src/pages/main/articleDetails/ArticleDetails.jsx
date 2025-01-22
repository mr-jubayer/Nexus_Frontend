import { Divider } from "@mui/material";
import FilledBtn from "../../../components/buttons/FilledBtn";
import { Link, useParams } from "react-router";
import usePremiumeUser from "../../../hooks/usePremiumeUser";
function ArticleDetails() {
  const { premiumeUser } = usePremiumeUser();

  const params = useParams();
  console.log(params);

  return;
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
        <h3
          className={`text-lg relative font-semibold mb-2 ${isPremium && "pl-3"}`}
        >
          {title}
          {isPremium && (
            <span className="absolute top-0 left-0 w-1 h-full bg-purple-600"></span>
          )}
        </h3>
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
        <p className="mb-2 text-sm text-gray-500">{`Publisher: ${publisher.value}`}</p>
        <Divider />
        <div className="flex justify-center">
          {isPremium ? (
            premiumeUser ? (
              <Link>
                <FilledBtn className="bg-myGreen hover:bg-myGreen/90  active:bg-myGreen text-white rounded-sm mt-5">
                  Read Article
                </FilledBtn>
              </Link>
            ) : (
              <FilledBtn className="bg-gray-400 text-white rounded-sm mt-5 cursor-default">
                Read Article
              </FilledBtn>
            )
          ) : (
            <Link>
              <FilledBtn className="bg-myGreen hover:bg-myGreen/90  active:bg-myGreen text-white rounded-sm mt-5 ">
                Read Article
              </FilledBtn>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleDetails;
