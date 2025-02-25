import { useNavigate } from "react-router";
import logo from "../assets/logow.png";

function BrandLogo1() {
  const navigate = useNavigate();
  const theme = localStorage.getItem("theme");

  if (theme === "dark") {
    <div>
      <img
        src={logo}
        alt="brand name"
        className="  md:h-6 h-5 cursor-pointer"
        onClick={() => navigate("/")}
      />
    </div>;
  }

  return (
    <div>
      <img
        src={logo}
        alt="brand name"
        className="  md:h-6 h-5 cursor-pointer"
        onClick={() => navigate("/")}
      />
    </div>
  );
}

export default BrandLogo1;
