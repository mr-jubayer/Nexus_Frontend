import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { Link } from "react-router";
import { Divider } from "@mui/material";

function LatestArtilces() {
  const axiosPublic = useAxiosPublic();
  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["latest-articles"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/api/articles/latest");
      return data;
    },
  });

  if (isLoading) {
    return;
  }

  return (
    <section className="mt-14">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6">
        {articles.map((article) => {
          return (
            <Link key={article._id} to={`/all-articles/details/${article._id}`}>
              <div
                className="group cursor-pointer  "
                title={article.premium && "Premium Article!"}
              >
                <div className="group-hover:ring-1 group-hover:ring-myGreen transition-all duration-300">
                  <img
                    src={article.thumbnail}
                    className="bg-green-300 md:h-48 h-60 object-cover group-hover:scale-95  transition-all duration-300"
                  />
                </div>
                <h2 className="text-xl text-center mt-2 px-2 group-hover:text-myGreen mb-3">
                  {article.title.split(" ")[0] +
                    " " +
                    article.title.split(" ")[1] +
                    " " +
                    article.title.split(" ")[2] +
                    " " +
                    article.title.split(" ")[3] +
                    " " +
                    article.title.split(" ")[4] +
                    " " +
                    article.title.split(" ")[5] +
                    " " +
                    article.title.split(" ")[6] +
                    " " +
                    article.title.split(" ")[7]}
                </h2>
                <Divider />
                <p className="mt-3 text-center"> {article.publisher} </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default LatestArtilces;
