import { Helmet } from "react-helmet-async";
import AreaChart from "../charts/AreaChart";
import PieChart from "../charts/PieChart";

function Dashboard() {
  return (
    <div className="w-full">
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="/dashboardfav.png" />
        <title>Nexus | DashBoard</title>
      </Helmet>
      <PieChart />
      <AreaChart />
    </div>
  );
}

export default Dashboard;
//
