import { useEffect, useState } from "react";
import Banner from "./banner/Banner";
import Prices from "./prices/Prices";
import AdModal from "./homeModal/AdModal";
import AllPublisher from "./allPublisher/AllPublisher";
import Statistics from "./statistic/Statistic";
import Reviews from "./reviews/Reviews";

function Home() {
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let showAd = setTimeout(() => {
      setIsOpen(true);
    }, 10000);
    return () => showAd;
  }, []);
  return (
    <div>
      <Banner />
      <AllPublisher />
      <Prices />
      <Statistics />
      <Reviews />
      {/* molal */}
      <AdModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default Home;
