import { useEffect, useState } from "react";
import Banner from "./banner/Banner";
import Prices from "./prices/Prices";
import AdModal from "./homeModal/AdModal";
import AllPublisher from "./allPublisher/AllPublisher";
import Statistics from "./statistic/Statistic";
import Reviews from "./reviews/Reviews";
import { Helmet } from "react-helmet-async";

function Home() {
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let showAd = setTimeout(() => {
      setIsOpen(true);
    }, 10000);
    return () => showAd;
  }, []);
  return (
    <div className="mt-16">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Nexus | Home</title>
      </Helmet>
      <Banner />
      <div className="max-w-7xl mx-auto min-h-80 lg:px-20 md:px-10 px-3">
        <AllPublisher />
        <Prices />
        <Statistics />
        <Reviews />
      </div>

      {/* molal */}
      {/* <AdModal isOpen={isOpen} setIsOpen={setIsOpen} /> */}
    </div>
  );
}

export default Home;
