import { useNavigate } from "react-router";
import logo from "../assets/logow.png";
import logo2 from "../assets/logob.png";
import useTheme from "../hooks/useTheme";

function BrandLogo2() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  return (
    <div>
      <img
        src={theme === "dark" ? logo : logo2}
        alt="brand name"
        className="  md:h-6 h-5 cursor-pointer"
        onClick={() => navigate("/")}
      />
    </div>
  );
}

export default BrandLogo2;
