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
import Profile from "../pages/dashboard/common/Profile";
import NotFound from "../pages/error/NotFound";
import AllArticle from "../pages/main/allArticle/AllArticle";
import ArticleDetails from "../pages/main/articleDetails/ArticleDetails";
import AddArticle from "../pages/main/home/addArticle/AddArticle";
import MyArticles from "../pages/main/myArticles/MyArticles";
import UpdateArticle from "../pages/main/myArticles/UpdateArticle";
import PremiumeArtilces from "../pages/main/premiumeArticles/PremiumeArtilces";
import Subscriptions from "../pages/main/subsciptions/Subscriptions";
import Payment from "../pages/payment/Payment";
import AdminRoutes from "../routes/AdminRoutes";
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

          <Route element={<PrivetRoutes />}>
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route element={<PrivetRoutes />}>
            <Route path="subscriptions" element={<Subscriptions />} />
          </Route>

          <Route path="all-articles" element={<AllArticle />} />

          <Route element={<PrivetRoutes />}>
            <Route path="premiume-articles" element={<PremiumeArtilces />} />
          </Route>

          <Route element={<PrivetRoutes />}>
            <Route path="my-articles" element={<MyArticles />} />
          </Route>

          <Route element={<PrivetRoutes />}>
            <Route path="my-articles/update/:id" element={<UpdateArticle />} />
          </Route>

          <Route element={<PrivetRoutes />}>
            <Route
              path="all-articles/details/:articleId"
              element={<ArticleDetails />}
            />
          </Route>

          <Route element={<PrivetRoutes />}>
            <Route path="payment" element={<Payment />} />
          </Route>
        </Route>

        {/* auth routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route element={<PrivetRoutes />}>
          <Route element={<AdminRoutes />}>
            {/* dashboard */}
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="root" element={<Dashboard />} />
              <Route path="users" element={<AllUser />} />
              <Route path="articles" element={<AllArticles />} />
              <Route path="add-publisher" element={<AddPublisher />} />
            </Route>
          </Route>
        </Route>
        {/* not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
