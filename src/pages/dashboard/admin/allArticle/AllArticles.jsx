import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import ArticleCard from "./ArticleCard";
import Spinner1 from "../../../../components/spinners/Spinner1";

function AllArticles() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
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
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-3 ">
        {data.map((article) => (
          <ArticleCard key={article._id} article={article} refetch={refetch} />
        ))}
      </div>
    </div>
  );
}

export default AllArticles;
