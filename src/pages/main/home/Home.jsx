import Banner from "./banner/Banner";
import Prices from "./prices/Prices";
import AllPublisher from "./allPublisher/AllPublisher";
import Reviews from "./reviews/Reviews";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import LatestArtilces from "./LatestArtilces/LatestArtilces";
import AdModal from "./homeModal/AdModal";
import InsightNews from "./InsightNews/InsightNews";
import TodaysBlog from "./totaysBlog/TodaysBlog";
import AncentSecretBorneo from "./ancentSecretBorneo/AncentSecretBorneo";

function Home() {
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let showAd = setTimeout(() => {
      // setIsOpen(true);
    }, 10000);
    return () => showAd;
  }, []);
  return (
    <div className="mt-12">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Nexus | Home</title>
      </Helmet>
      <Banner />
      <div className="max-w-7xl mx-auto min-h-80 lg:px-20 md:px-10 px-3 ">
        <Prices />
        <AllPublisher />
        <LatestArtilces />
        <InsightNews />
        <TodaysBlog />
        <AncentSecretBorneo />
        <Reviews />
      </div>

      {/* molal */}
      <AdModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default Home;
