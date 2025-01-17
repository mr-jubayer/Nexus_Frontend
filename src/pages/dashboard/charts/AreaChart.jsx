import { Chart } from "react-google-charts";

export const data = [
  ["Year", "Sales", "Expenses"],
  ["2013", 1000, 400],
  ["2014", 1170, 460],
  ["2015", 660, 1120],
  ["2016", 1030, 540],
];

export const options = {
  isStacked: "relative",
  height: 300,
  legend: { position: "top", maxLines: 3 },
  vAxis: {
    minValue: 0,
    ticks: [0, 0.3, 0.6, 0.9, 1],
  },
};

export default function AreaChart() {
  return (
    <Chart
      chartType="AreaChart"
      className="h-[300px] w-11/12 mx-auto"
      data={data}
      options={options}
    />
  );
}
