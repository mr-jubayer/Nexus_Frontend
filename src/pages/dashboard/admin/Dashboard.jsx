import { useNavigate } from "react-router";
import AreaChart from "../charts/AreaChart";
import PieChart from "../charts/PieChart";
import { useEffect } from "react";

function Dashboard() {
  return (
    <div className="w-full">
      <PieChart />
      <AreaChart />
    </div>
  );
}

export default Dashboard;
