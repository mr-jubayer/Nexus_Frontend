import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

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
        <SwiperSlide style={{ backgroundColor: "#ffadad" }}>
          Slide 1
        </SwiperSlide>
        <SwiperSlide style={{ backgroundColor: "#ffd6a5" }}>
          Slide 2
        </SwiperSlide>
        <SwiperSlide style={{ backgroundColor: "#fdffb6" }}>
          Slide 3
        </SwiperSlide>
        <SwiperSlide style={{ backgroundColor: "#caffbf" }}>
          Slide 4
        </SwiperSlide>
        <SwiperSlide style={{ backgroundColor: "#9bf6ff" }}>
          Slide 5
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
