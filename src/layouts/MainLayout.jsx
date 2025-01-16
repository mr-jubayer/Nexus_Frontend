import { Outlet } from "react-router";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";

function MainLayout() {
  return (
    <div>
      {/* navbar */}
      <div className="md:px-5 px-3 py-5 shadow-sm">
        <NavBar />
      </div>
      {/* dynamic page */}
      <div className="max-w-6xl mx-auto min-h-80 px-3">
        <Outlet />
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
}
export default MainLayout;
