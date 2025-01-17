import Chart from "react-google-charts";

const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7], // CSS-style declaration
];

const options = {
  title: "My Daily Activities",
  pieHole: 0.4,
  is3D: false,
};

export default function PieChart() {
  return (
    <Chart
      className="h-[300px] w-11/12 mx-auto"
      chartType="PieChart"
      data={data}
      options={options}
    />
  );
}
