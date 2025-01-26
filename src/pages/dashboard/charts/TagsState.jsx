import { Chart } from "react-google-charts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export default function TagsState() {
  const axiosSecure = useAxiosSecure();

  const { data: chartData = [], isLoading } = useQuery({
    queryKey: ["tags-state"],
    queryFn: async () => {
      const { data } = await axiosSecure("/api/articles/tags-state");

      // Prepare the chart data
      const processedData = [
        ["Tag", "Count", { role: "style" }],
        ...data.map((item, index) => [
          item._id.join(", "), // Join tags in case of multiple
          item.count,
          `hsl(${index * 50}, 70%, 50%)`, // Generate unique colors for bars
        ]),
      ];

      return processedData;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[300px] w-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  const options = {
    title: "Tags Distribution",
    hAxis: {
      title: "Tags",
      textStyle: { fontSize: 12 },
    },
    vAxis: {
      title: "Count",
      textStyle: { fontSize: 12 },
    },
    chartArea: { width: "80%", height: "70%" },
    legend: { position: "none" },
    bar: { groupWidth: "70%" },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-11/12 mx-auto">
      <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">
        Tags Statistics
      </h2>
      <Chart
        className="h-[300px] w-full mx-auto"
        chartType="ColumnChart"
        width="100%"
        height="300px"
        data={chartData}
        options={options}
      />
    </div>
  );
}
