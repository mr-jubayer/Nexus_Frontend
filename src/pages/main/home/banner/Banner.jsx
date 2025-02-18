import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination"; // Added to ensure pagination styles
import "./styles.css";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import FilledBtn from "../../../../components/buttons/FilledBtn";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router";

export default function Banner() {
  const axiosSecure = useAxiosSecure();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: popularArticles = [] } = useQuery({
    queryKey: ["popularArticles"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/api/articles/popular`);
      return data;
    },
  });

  const slides =
    popularArticles.length < 3
      ? [...popularArticles, ...popularArticles]
      : popularArticles;

  // ✅ Force autoplay to start
  useEffect(() => {
    const swiper = document.querySelector(".mySwiper")?.swiper;
    if (swiper) {
      swiper.autoplay.start();
    }
  }, []);

  return (
    <div className="xl:h-[550px] w-full md:h-[500px] h-[560px]">
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          waitForTransition: true, // Ensures smooth autoplay
        }}
        speed={1400}
        effect="fade"
        fadeEffect={{ crossFade: true }} // ✅ Smooth fade effect
        modules={[EffectFade, Autoplay, Pagination]}
        className="mySwiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((art, i) => (
          <SwiperSlide key={i}>
            <motion.div
              className="relative h-full w-full object-cover "
              style={{
                backgroundImage: `url('${art.thumbnail}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 2, ease: "easeOut" } }}
            >
              <div className="bg-black/50 w-full h-full flex flex-col justify-end  text-left">
                <div className="max-w-7xl mx-auto pb-5 lg:px-20 md:px-10 px-3 drop-shadow-2xl ">
                  <h1 className="text-white md:text-5xl text-3xl font-bold mb-2 uppercase text-left">
                    {art?.title?.slice(0, 20)}
                  </h1>
                  <h2 className="text-white lg:w-10/12 w-11/12 md:text-lg text-base drop-shadow-2xl ">
                    {art?.description?.slice(0, 200)}
                  </h2>
                  <Link to={`all-articles/details/${art._id}`}>
                    <FilledBtn className="bg-myGreen text-white border-b-2 mt-5 w-[200px] py-3 hover:bg-black2 hover:border-myGreen border-black1">
                      Explore
                    </FilledBtn>
                  </Link>
                </div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
