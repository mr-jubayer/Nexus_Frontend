import { useEffect, useState } from "react";
import Banner from "./banner/Banner";
import Prices from "./prices/Prices";
import AdModal from "./homeModal/AdModal";

function Home() {
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let showAd = setTimeout(() => {
      setIsOpen(true);
    }, 2000);
    return () => showAd;
  }, []);
  return (
    <div>
      <Banner />
      <Prices />

      {/* molal */}
      <AdModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default Home;
