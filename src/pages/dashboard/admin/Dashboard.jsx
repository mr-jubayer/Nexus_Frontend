import AreaChart from "../charts/AreaChart";
import PieChart from "../charts/PieChart";

function Dashboard() {
  return (
    <div className="w-full">
      <PieChart />
      <AreaChart />
    </div>
  );
}

export default Dashboard;
