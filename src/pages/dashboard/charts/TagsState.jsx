import { Chart } from "react-google-charts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useTheme from "../../../hooks/useTheme";

export default function TagsState() {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
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
    options.backgroundColor = "424242";
    options.color = "white";
  }

  return (
    <div className="bg-white shadow-md p-4 w-11/12 mx-auto dark:bg-black2">
      <h2 className="text-center text-xl font-semibold text-gray-800 mb-4 dark:text-darkHeading ">
        Tags Statistics
      </h2>
      <Chart
        className=" md:h-[250px] h-[200px]"
        chartType="ColumnChart"
        width="100%"
        data={chartData}
        options={options}
      />
    </div>
  );
}
