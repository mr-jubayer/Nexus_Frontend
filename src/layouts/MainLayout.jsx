import { Outlet } from "react-router";
import NavBar from "../components/common/NavBar";

function MainLayout() {
  return (
    <div>
      {/* navbar */}
      <div className="md:px-5 px-3 py-5 shadow-sm">
        <NavBar />
      </div>
      {/* dynamic page */}
      <div className="max-w-6xl mx-auto">
        <Outlet />
      </div>
      {/* footer */}
    </div>
  );
}
export default MainLayout;
