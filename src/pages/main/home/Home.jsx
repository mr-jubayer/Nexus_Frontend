import useRole from "../../../hooks/useRole";
import Banner from "./banner/Banner";
import Prices from "./prices/Prices";

function Home() {
  const res = useRole();
  return (
    <div>
      <Banner />
      <Prices />
    </div>
  );
}

export default Home;
