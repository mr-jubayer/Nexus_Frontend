/* eslint-disable react/prop-types */
import { Divider } from "@mui/material";
import FilledBtn from "../../../components/buttons/FilledBtn";
import { Link } from "react-router";
import usePremiumeUser from "../../../hooks/usePremiumeUser";
import useUserInfo from "../../../hooks/useUserInfo";

export default function MainArticleCard({ article }) {
  const { premiumeUser } = usePremiumeUser();
  const { userInfo } = useUserInfo();

  const {
    _id,
    authorInfo,
    title,
    description,
    tags,
    creationTime,
    thumbnail,
    isPremium,
    views,
  } = article || {};

  const time = new Date(creationTime).toLocaleDateString();

  return (
    <div
      className={`${isPremium ? "border-2 border-purple-600" : ""} max-w-lg mx-auto border bg-white/50 dark:bg-black1/90 dark:border-blackGray/50 w-full shadow-sm overflow-hidden `}
    >
      {/* Header */}
      <div className="flex p-4 border-b justify-between">
        <div className="flex items-center">
          <img
            src={authorInfo?.profilePhoto}
            alt={authorInfo.fullName || "Author"}
            className="w-12 h-12 rounded-full mr-4"
          />

          <div>
            <p className="font-bold dark:text-darkHeading">
              {authorInfo.fullName}
            </p>
            <p className="text-sm dark:text-whiteGray">{authorInfo.email}</p>
          </div>
        </div>
        <div className="self-start text-xs dark:text-whiteGray">
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
          className={`text-lg relative font-semibold mb-2 ${isPremium && "pl-3"} dark:text-darkHeading`}
        >
          {title.slice(0, 70)}...
          {isPremium && (
            <span className="absolute top-0 left-0 w-1 h-full bg-purple-600"></span>
          )}
        </h3>
        <p className="text-sm text-gray-700 mb-2 dark:text-whiteGray">
          {description.length > 120
            ? `${description.slice(0, 120)}...`
            : description}
        </p>
        <Divider className="dark:bg-whiteGray/40" />
        <p className="text-sm  mt-3   dark:text-whiteGray">
          views: {views || 0}
        </p>
        <p className="text-sm text-gray-500  dark:text-whiteGray">
          {tags.length ? tags.map((tag) => `#${tag} `) : "No tags"}
        </p>

        <Divider />
        <div className="flex justify-center">
          {isPremium ? (
            premiumeUser || userInfo?.role === "admin" ? (
              <Link to={`/all-articles/details/${_id}`}>
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
            <Link to={`/all-articles/details/${_id}`}>
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
