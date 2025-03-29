import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination"; // Added to ensure pagination styles
import "./styles.css";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Heading from "../../../../components/Heading";
import { Link } from "react-router";

export default function Banner() {
  const axiosSecure = useAxiosSecure();

  const { data: popularArticles = [], isLoading } = useQuery({
    queryKey: ["popularArticles"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/api/articles/popular`);
      return data;
    },
  });

  const firstArticle = popularArticles[0];
  return (
    <div className="pt-24 ">
      <div className="max-w-7xl mx-auto lg:px-20 md:px-10 px-3   grid grid-cols-12 md:gap-8">
        {/* left container */}
        {isLoading ? (
          <div className="col-span-8 h-[400px] bg-black/10"></div>
        ) : (
          <div className="relative col-span-8 max-h-[400px] w-full ">
            <img
              src={firstArticle?.thumbnail}
              alt={firstArticle?.title}
              className="w-full h-full object-cover rounded-md shadow-sm"
            />
            <div className="text-4xl absolute bottom-2   text-white   drop-shadow-2xl">
              <p className="bg-black1 text-lg  pl-8 md:w-44">
                {new Date(firstArticle?.creationTime).getDate() +
                  "/" +
                  new Date(firstArticle?.creationTime).getMonth() +
                  1 +
                  "/" +
                  new Date(firstArticle?.creationTime).getFullYear()}
              </p>

              <h2 className="bg-[#1b8f19] px-4 py-1.5 pl-8 mt-2">
                {firstArticle?.title.slice(0, 34)}
              </h2>
              <h2 className="mt-1 bg-[#1b8f19] px-3 py-1.5 pl-8">
                {firstArticle?.title.slice(34, -1)}
              </h2>
            </div>
          </div>
        )}
        <div className="col-span-4">
          <Heading title="Trending Articles" className="text-left mb-5" />
          {popularArticles?.slice(1)?.map((article) => (
            <TrendingArticle key={article._id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}

function TrendingArticle({ article }) {
  return (
    <Link to={`/all-articles/details/${article._id}`}>
      <div className="mb-5 flex gap-4 items-center group/edit  cursor-pointer">
        <div className="">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-24 aspect-square object-cover rounded-full group-hover/edit:scale-95 transition-all duration-300"
          />
        </div>
        <div>
          <p className=" text-sm   dark:text-white/90">
            {new Date(article.creationTime).getDate() +
              " / " +
              new Date(article.creationTime).getMonth() +
              " / " +
              new Date(article.creationTime).getFullYear()}{" "}
            - <span className="text-[#1b8f19]"> {article.publisher} </span>
          </p>
          <h2 className="text-mds mt-1  leading-5 group-hover/edit:underline dark:text-white/90">
            {" "}
            {article.title.slice(0, 38)}...
          </h2>
        </div>
      </div>
    </Link>
  );
}
