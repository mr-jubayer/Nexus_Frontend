import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div>
      <div className="max-w-6xl mx-auto flex justify-center">
        <Outlet />
      </div>
    </div>
  );
}
export default AuthLayout;
