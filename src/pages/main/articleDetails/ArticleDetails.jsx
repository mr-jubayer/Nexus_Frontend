import { Divider } from "@mui/material";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner1 from "../../../components/spinners/Spinner1";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
function ArticleDetails() {
  const params = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: article,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["article"],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/api/articles/article/${params.articleId}`
      );
      return data;
    },
  });

  useEffect(() => {
    (async function () {
      await axiosSecure.post(`/api/articles/views/${params.articleId}`);
      refetch();
    })();
  }, [axiosSecure, params.articleId, refetch]);

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
    views,
  } = article || {};

  const time = new Date(creationTime).toLocaleDateString();

  if (isLoading) return <Spinner1 />;
  return (
    <div className="md:my-14 my-5">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Nexus | {title}</title>
      </Helmet>
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
          <div className="self-start md:text-lg ">
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
          <div className="flex justify-between items-center ">
            <p className="text-gray-500 md:text-xl p-2">
              Published in:{" "}
              <span className="text-black font-bold ">{publisher}</span>`
            </p>
            <p className="md:text-lg text-xs text-nowrap pr-3">
              Views: {views || 0}
            </p>
          </div>
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
