import Chart from "react-google-charts";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTheme from "../../../hooks/useTheme";

export default function PublishersState() {
  const axiosSecure = useAxiosSecure();
  const { theme } = useTheme();
  const { data: states = [], isLoading } = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const { data } = await axiosSecure("/api/articles/states");
      return [["Publisher", "Count"], ...data];
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
      },
    },
  };

  if (theme === "dark") {
    options.backgroundColor = "424242";
    options.color = "white";
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="bg-white shadow-md p-4 w-11/12 mx-auto dark:bg-black2 ">
      <h2 className="text-center text-xl font-semibold text-gray-800 mb-4 dark:text-darkHeading ">
        Publishers Statistics
      </h2>

      <Chart
        className="md:h-[250px] h-[200px]  mx-auto"
        chartType="PieChart"
        data={states}
        options={options}
      />
    </div>
  );
}
