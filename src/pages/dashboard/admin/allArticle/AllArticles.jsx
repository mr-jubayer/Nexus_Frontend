import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import ArticleCard from "./ArticleCard";
import Spinner1 from "../../../../components/spinners/Spinner1";

function AllArticles() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data = [], isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/articles`);
      return data;
    },
  });
  console.log(data);
  if (isLoading) return <Spinner1 />;
  return (
    <div>
      <div>
        {data.map((article) => (
          <ArticleCard key={article._id} article={article} />
        ))}
      </div>
    </div>
  );
}

export default AllArticles;
