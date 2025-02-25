import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import ArticleCard from "./ArticleCard";
import Spinner1 from "../../../../components/spinners/Spinner1";

function AllArticles() {
  const axiosSecure = useAxiosSecure();

  // Pagination state
  const [page, setPage] = useState(1); // Start at page 1
  const [rowsPerPage, setRowsPerPage] = useState(6); // Default rows per page

  const {
    data = { articles: [], total: 0 },
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["articles", page, rowsPerPage],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/api/articles?page=${page}&limit=${rowsPerPage}`
      );
      return data;
    },
  });

  if (isLoading) return <Spinner1 />;

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-3">
        {data.articles.map((article) => (
          <ArticleCard key={article._id} article={article} refetch={refetch} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handleChangePage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-myGreen text-white ml-2 disabled:bg-gray-500  mr-2"
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {Array.from(
            { length: Math.ceil(data.total / rowsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => handleChangePage(index + 1)}
                className={`px-4 py-2  ${page === index + 1 ? "bg-myGreen text-white" : "bg-gray-200"}`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => handleChangePage(page + 1)}
          disabled={page === Math.ceil(data.total / rowsPerPage)}
          className="px-4 py-2 bg-myGreen text-white ml-2 disabled:bg-gray-500 "
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllArticles;
