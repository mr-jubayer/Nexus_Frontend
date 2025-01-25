import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner1 from "../../../components/spinners/Spinner1";
import MainArticleCard from "../allArticle/MainArticleCard";
import Heading from "../../../components/Heading";
import { Divider } from "@mui/material";
import useUserInfo from "../../../hooks/useUserInfo";
import { useNavigate } from "react-router";
import { Helmet } from "react-helmet-async";

function PremiumeArtilces() {
  const axiosSecure = useAxiosSecure();
  const { userInfo } = useUserInfo();
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["premiumeArtilces"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/articles/premiume`);

      return data;
    },
  });
  const navigate = useNavigate();

  if (!userInfo?.premiumeToken) navigate("/");
  if (isLoading) return <Spinner1 />;
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Nexus | Premiume Articles</title>
      </Helmet>
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
