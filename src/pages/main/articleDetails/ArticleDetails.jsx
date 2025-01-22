import { Divider } from "@mui/material";
import FilledBtn from "../../../components/buttons/FilledBtn";
import { Link, useParams } from "react-router";
import usePremiumeUser from "../../../hooks/usePremiumeUser";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner1 from "../../../components/spinners/Spinner1";
function ArticleDetails() {
  const { premiumeUser } = usePremiumeUser();
  const params = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: article, isLoading } = useQuery({
    queryKey: ["article"],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/api/articles/article/${params.articleId}`
      );
      return data;
    },
  });

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

  if (isLoading) return <Spinner1 />;
  return (
    <div className="md:my-14 my-5">
      <h3
        className={`md:text-5xl text-2xl capitalize relative font-semibold mb-3 `}
      >
        {title}
      </h3>
      <div className={` mx-auto border bg-white/50   `}>
        {/* Header */}
        <div className="flex p-4 border-b justify-between">
          <div className="flex items-center">
            <img
              src={authorInfo.profilePhoto || "https://via.placeholder.com/40"}
              alt={authorInfo.fullName || "Author"}
              className="w-14 h-14 rounded-full mr-4"
            />

            <div>
              <p className="font-bold">{authorInfo.fullName}</p>
              <p className="text-sm">{authorInfo.email}</p>
            </div>
          </div>
          <div className="self-start text-lg ">
            <p>{time} </p>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="relative">
          <img
            src={thumbnail}
            alt="Article Thumbnail"
            className=" w-full xl:h-[450px] md:h-[400px] h-[200px] object-cover"
          />
          {isPremium && (
            <div className="px-3 py-1 bg-purple-600 text-white absolute top-0 right-0 rounded-none">
              Premiume
            </div>
          )}
          <p className="text-gray-500 text-xl p-2">
            Published in:{" "}
            <span className="text-black font-bold ">{publisher}</span>`
          </p>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-lg text-gray-700 mb-2">{description}</p>
          <Divider />
          <h2 className="my-4 font-semibold text-xl">More Info</h2>
          <p className=" text-gray-500 mt-3 ">
            <strong>Tags:</strong>{" "}
            {tags.length ? tags.map((tag) => `#${tag} `) : "No tags"}
          </p>
          <p className=" font-medium my-1">
            <strong>Status:</strong>{" "}
            <span
              className={`${
                status === "published" ? "text-green-600" : "text-orange-500"
              } font-bold`}
            >
              {status}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetails;
