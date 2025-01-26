import Chart from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const options = {
  title: "User Distribution",
  pieHole: 0.4,
  is3D: false,
  chartArea: { width: "90%", height: "80%" },
};

export default function UserStates() {
  const axiosSecure = useAxiosSecure();

  const { data: states = [], isLoading } = useQuery({
    queryKey: ["users-states"],
    queryFn: async () => {
      const { data } = await axiosSecure("/api/users/statistics");

      // Prepare the chart data
      const chartData = [
        ["User Type", "Count"],
        ["Total Users", data.totalUsers],
        ["Premium Users", data.premiumUsers],
        ["Normal Users", data.normalUsers],
      ];

      return chartData;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-11/12 mx-auto">
      <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
        Users Statistics
      </h2>

      <Chart
        className="h-[300px] w-full mx-auto"
        chartType="PieChart"
        data={states}
        options={options}
      />
    </div>
  );
}
