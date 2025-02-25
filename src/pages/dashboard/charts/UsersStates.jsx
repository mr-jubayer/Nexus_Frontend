import Chart from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTheme from "../../../hooks/useTheme";

export default function UserStates() {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();

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

  const options = {
    pieHole: 0.4,

    pieStartAngle: 100,
    sliceVisibilityThreshold: 0.02,
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        fontSize: 14,
        color: "white",
      },
    },
  };

  if (theme === "dark") {
    options.backgroundColor = "#424242";
    options.color = "white";
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[300px]">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  return (
    <div className="bg-white shadow-md p-4 w-11/12 mx-auto dark:bg-black2">
      <h2 className="text-center text-xl font-semibold text-gray-800 mb-4 dark:text-darkHeading">
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
