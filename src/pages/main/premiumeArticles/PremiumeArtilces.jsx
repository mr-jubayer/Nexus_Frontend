import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner1 from "../../../components/spinners/Spinner1";
import MainArticleCard from "../allArticle/MainArticleCard";
import Heading from "../../../components/Heading";
import { Divider } from "@mui/material";

function PremiumeArtilces() {
  const axiosSecure = useAxiosSecure();
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["premiumeArtilces"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/articles/premiume`);

      return data;
    },
  });

  if (isLoading) return <Spinner1 />;
  return (
    <div>
      <div className="mb-8 mt-6 ">
        <Heading title="Premiume Article" />
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

export default PremiumeArtilces;
