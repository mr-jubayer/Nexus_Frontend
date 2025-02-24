import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";

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
            <div key={article._id} className="group cursor-pointer  ">
              <div className="group-hover:ring-1 group-hover:ring-myGreen transition-all duration-300">
                <img
                  src={article.thumbnail}
                  className="bg-green-300 md:h-48 h-60 object-cover group-hover:scale-95  transition-all duration-300"
                />
              </div>
              <h2 className="text-xl text-center mt-2 px-2 group-hover:text-myGreen">
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
              <p className="mt-5 text-center"> {article.publisher} </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default LatestArtilces;
