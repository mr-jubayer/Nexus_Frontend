import { useNavigate } from "react-router";
import logo from "../assets/logow.png";

function BrandLogo2() {
  const navigate = useNavigate();
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

export default BrandLogo2;
