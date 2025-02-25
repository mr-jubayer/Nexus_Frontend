import { Outlet } from "react-router";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import PageLoader from "../components/spinners/PageLoader";
import ReapopToaster from "../components/reapopToaster";
import useAuth from "../hooks/useAuth";
import Theme from "../components/Theme";

function MainLayout() {
  const { loading } = useAuth();

  if (loading) return <PageLoader />;
  return (
    <div className="dark:bg-black1">
      {/* navbar */}
      <div>
        <NavBar />
      </div>
      {/* dynamic page */}
      {/* max-w-7xl mx-auto lg:px-20 md:px-10 px-3 */}
      <div className="min-h-80 ">
        <Outlet />
      </div>
      {/* footer */}
      <Footer />

      {/* toaster */}
      <ReapopToaster />
      {/* theme controller */}
      <Theme />
    </div>
  );
}
export default MainLayout;
