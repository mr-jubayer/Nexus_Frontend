import { BrowserRouter, Route, Routes, MainLayout } from ".";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
