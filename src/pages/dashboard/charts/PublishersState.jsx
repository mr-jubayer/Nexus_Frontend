import Chart from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const options = {
  title: "States",
  pieHole: 0.4,
  is3D: false,
};

export default function PublishersState() {
  const axiosSecure = useAxiosSecure();

  const { data: states = [], isLoading } = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const { data } = await axiosSecure("/api/articles/states");
      return [["Publisher", "Count"], ...data]; // Add headers to the data
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-11/12 mx-auto">
      <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
        Publishers Statistics
      </h2>

      <Chart
        className="h-[300px] w-11/12 mx-auto"
        chartType="PieChart"
        data={states} // Use the fetched data
        options={options}
      />
    </div>
  );
}
