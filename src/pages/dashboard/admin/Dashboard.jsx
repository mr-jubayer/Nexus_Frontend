import { Helmet } from "react-helmet-async";
import PublishersState from "../charts/PublishersState";
import TagsState from "../charts/TagsState";
import Divider from "@mui/material/Divider";
import UserStates from "../charts/UsersStates";
import { useLocation } from "react-router";

function Dashboard() {
  return (
    <div className="w-full">
      <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" type="image/png" href="/dashboardfav.png" />
        <title>Nexus | DashBoard</title>
      </Helmet>
      <div className="grid grid-cols-2">
        <PublishersState />

        <TagsState />
      </div>
      <div className="md:my-5 my-2">
        <Divider />
      </div>
      <UserStates />
    </div>
  );
}

export default Dashboard;
