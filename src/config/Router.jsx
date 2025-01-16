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
        {/* not found page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
