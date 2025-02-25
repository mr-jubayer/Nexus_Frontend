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
    queryKey: ["article", params.articleId],
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
    <div className="mt-24 mb-10 max-w-7xl mx-auto min-h-80 lg:px-20 md:px-10 px-3">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Nexus | {title}</title>
      </Helmet>
      <h3
        className={`md:text-5xl text-2xl capitalize relative font-semibold mb-3 dark:text-darkHeading`}
      >
        {title}
      </h3>
      <div
        className={` mx-auto border dark:border-whiteGray/35 bg-white/50   dark:bg-black1`}
      >
        {/* Header */}
        <div className="flex p-4 border-b justify-between">
          <div className="flex items-center">
            <img
              src={authorInfo.profilePhoto || "https://via.placeholder.com/40"}
              alt={authorInfo.fullName || "Author"}
              className="w-14 h-14 rounded-full mr-4"
            />

            <div>
              <p className="font-bold dark:text-darkHeading">
                {authorInfo.fullName}
              </p>
              <p className="text-sm dark:text-whiteGray">{authorInfo.email}</p>
            </div>
          </div>
          <div className="self-start md:text-lg  dark:text-whiteGray">
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
              By:{" "}
              <span className="text-black font-bold  dark:text-darkHeading">
                {publisher}
              </span>
              `
            </p>
            <p className="md:text-lg text-xs text-nowrap pr-3 dark:text-whiteGray">
              Views: {views || 0}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className=" text-gray-500 mb-3 ">
            {tags.length ? tags.map((tag) => `#${tag} `) : "No tags"}
          </p>
          <p className="text-lg text-gray-700 mb-2 dark:text-whiteGray">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ArticleDetails;
