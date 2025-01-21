import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner1 from "../../../components/spinners/Spinner1";
import MainArticleCard from "./MainArticleCard";

function AllArticle() {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/api/articles/published`);
      return data;
    },
  });
  if (isLoading) return <Spinner1 />;
  return (
    <div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-3  mb-10">
        {data.map((article) => (
          <MainArticleCard
            key={article._id}
            article={article}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
}

export default AllArticle;
