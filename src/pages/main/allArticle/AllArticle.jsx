import useAxiosSecure from "../../../hooks/useAxiosSecure";
import MainArticleCard from "./MainArticleCard";
import Header from "./Header";
import debounceHandler from "./debounce";
import { useEffect, useState } from "react";
import Spinner1 from "../../../components/spinners/Spinner1";

function AllArticle() {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);

  const [articles, setArticles] = useState([]);
  const [filter, setFilter] = useState({
    title: "",
    publisher: "",
    tags: "",
  });

  useEffect(() => {
    setLoading(true);
    debounceHandler(async () => {
      try {
        const { data } = await axiosSecure.get(`/api/articles/filter`, {
          params: filter,
        });
        setArticles(data);
        setLoading(false);
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

  return (
    <div>
      <Header
        tagsChangeHandler={tagsChangeHandler}
        pubChangeHandler={pubChangeHandler}
        searchChangeHandler={searchChangeHandler}
      />

      {loading ? (
        <Spinner1 />
      ) : articles.length ? (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-3 mb-10">
          {articles.map((article) => (
            <MainArticleCard key={article._id} article={article} />
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
