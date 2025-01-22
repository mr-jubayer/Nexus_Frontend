import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner1 from "../../../components/spinners/Spinner1";
import MainArticleCard from "./MainArticleCard";
import Header from "./Header";
import debounceHandler from "./debounce";
import { useEffect, useState } from "react";

function AllArticle() {
  const axiosSecure = useAxiosSecure();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/api/articles/published`);
      return data;
    },
  });

  const [articles, setArticles] = useState(data);
  const [filter, setFilter] = useState({
    title: "",
    publisher: "",
    tags: "",
  });

  useEffect(() => {
    debounceHandler(async () => {
      try {
        const { data } = await axiosSecure.get(`/api/articles/filter`, {
          params: filter,
        });
        setArticles(data); // Update articles state with filtered results
      } catch (error) {
        console.error("Error fetching filtered articles:", error);
      }
    });
  }, [filter, axiosSecure]);

  const tagsChangeHandler = (e) => {
    const tag = e.target.value;
    setFilter({ ...filter, tags: tag });
  };

  const pubChangeHandler = (e) => {
    const publisher = e.target.value;
    setFilter({ ...filter, publisher });
  };
  const searchChangeHandler = (e) => {
    const title = e.target.value;
    setFilter({ ...filter, title });
  };

  if (isLoading) return <Spinner1 />;

  return (
    <div>
      <Header
        tagsChangeHandler={tagsChangeHandler}
        pubChangeHandler={pubChangeHandler}
        searchChangeHandler={searchChangeHandler}
      />

      {articles.length ? (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-3 mb-10">
          {articles.map((article) => (
            <MainArticleCard
              key={article._id}
              article={article}
              refetch={refetch}
            />
          ))}
        </div>
      ) : (
        <div className="h-[300px] flex justify-center items-center text-3xl font-semibold w-full">
          No Article Found!
        </div>
      )}
    </div>
  );
}

export default AllArticle;
