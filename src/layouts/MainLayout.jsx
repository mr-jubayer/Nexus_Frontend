import { Outlet } from "react-router";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import useUserInfo from "../hooks/useUserInfo";
import PageLoader from "../components/spinners/PageLoader";
import ReapopToaster from "../components/reapopToaster";

function MainLayout() {
  const { userInfo } = useUserInfo();
  if (!userInfo) return <PageLoader />;
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

      {/* toaster */}
      <ReapopToaster />
    </div>
  );
}
export default MainLayout;
