import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./styles.css";

import { Navigation, Autoplay } from "swiper/modules";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import FilledBtn from "../../../../components/buttons/FilledBtn";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";

export default function Banner() {
  const axiosSecure = useAxiosSecure();
  const [activeIndex, setActiveIndex] = useState(0); // Track active slide index

  const { data: popularArticles = [], isLoading } = useQuery({
    queryKey: ["popularArticles"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/api/articles/popular`);
      return data;
    },
  });

  return (
    <div className="p-5 xl:h-[550px] w-full md:h-[500px] h-[560px]">
      <Swiper
        navigation={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        speed={1400}
      >
        {popularArticles.map((art, i) => (
          <SwiperSlide key={i}>
            <motion.div
              className="relative h-full w-full object-cover"
              style={{ backgroundImage: `url('${art.thumbnail}')` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 2, ease: "easeOut" },
              }}
            >
              <div className="bg-black/40 w-full h-full md:px-32 p-10 flex flex-col justify-center items-center">
                <motion.h1
                  key={activeIndex} // Unique key to reset animation on each slide
                  className="text-white text-5xl font-medium mb-2 uppercase"
                  initial={{ opacity: 0, x: "40%" }} // Starts off-screen
                  animate={{ opacity: 1, x: "0%" }} // Animates to position
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                  }}
                >
                  {art?.title?.slice(0, 20)}
                </motion.h1>

                {/* Subtitle */}
                <motion.h2
                  key={`desc-${activeIndex}`}
                  className="text-white text-lg drop-shadow-2xl mb-2"
                  initial={{ opacity: 0, x: "40%" }}
                  animate={{ opacity: 1, x: "0%" }}
                  transition={{
                    duration: 2,
                    ease: "easeOut",
                    delay: 0.2, // Delay for better effect
                  }}
                >
                  {art?.description?.slice(0, 200)}
                </motion.h2>

                {/* Explore Button */}
                <Link to={`all-articles/details/${art._id}`}>
                  <FilledBtn className="bg-myGreen text-white border-b-2 mt-8 w-[200px] py-3 hover:bg-black2 hover:border-myGreen border-black1">
                    Explore
                  </FilledBtn>
                </Link>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
