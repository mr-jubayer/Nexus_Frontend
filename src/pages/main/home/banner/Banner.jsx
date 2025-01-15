import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "./styles.css";

import { Navigation, Autoplay } from "swiper/modules";

export default function Banner() {
  return (
    <div className="p-5 xl:h-[550px] w-full md:h-[500px] h-[560px]">
      <Swiper
        navigation={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide style={{ backgroundColor: "#ce6d6d" }}>
          Slide 1
        </SwiperSlide>
        <SwiperSlide style={{ backgroundColor: "#df7e08" }}>
          Slide 2
        </SwiperSlide>
        <SwiperSlide style={{ backgroundColor: "#7c8103" }}>
          Slide 3
        </SwiperSlide>
        <SwiperSlide style={{ backgroundColor: "#25d003" }}>
          Slide 4
        </SwiperSlide>
        <SwiperSlide style={{ backgroundColor: "#05b2c1" }}>
          Slide 5
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
