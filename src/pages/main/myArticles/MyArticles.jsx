import Heading from "../../../components/Heading";
import { Divider } from "@mui/material";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import MainArticleCard from "../allArticle/MainArticleCard";
import Spinner1 from "../../../components/spinners/Spinner1";
import useUserInfo from "../../../hooks/useUserInfo";

function MyArticles() {
  const axiosSecure = useAxiosSecure();
  const { userInfo, isLoading } = useUserInfo();
  const { data: articles = [] } = useQuery({
    queryKey: ["my-artilces", userInfo?._id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/api/articles/my-articles/${userInfo?._id}`
      );

      return data;
    },
  });

  if (isLoading) return <Spinner1 />;
  return (
    <div>
      <div className="mb-8 mt-6 ">
        <Heading title="My Articles" />
      </div>
      <Divider />
      {articles.length ? (
        <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-3 mb-10 mt-8">
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

export default MyArticles;
