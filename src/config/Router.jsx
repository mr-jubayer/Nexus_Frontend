import {
  BrowserRouter,
  Route,
  Routes,
  MainLayout,
  Home,
  AuthLayout,
  Login,
  SignUp,
} from ".";
import DashboardLayout from "../layouts/DashboardLayout";
import AddPublisher from "../pages/dashboard/admin/AddPublisher";
import AllArticles from "../pages/dashboard/admin/allArticle/AllArticles";
import AllUser from "../pages/dashboard/admin/AllUser";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import NotFound from "../pages/error/NotFound";
import AddArticle from "../pages/main/home/addArticle/AddArticle";
import PrivetRoutes from "../routes/PrivetRoutes";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* main routes */}
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* privet routes */}
          <Route element={<PrivetRoutes />}>
            <Route path="add-article" element={<AddArticle />} />
          </Route>
        </Route>
        {/* auth routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        {/* dashboard */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="root" element={<Dashboard />} />
          <Route path="users" element={<AllUser />} />
          <Route path="articles" element={<AllArticles />} />
          <Route path="add-publisher" element={<AddPublisher />} />
        </Route>
        {/* not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
