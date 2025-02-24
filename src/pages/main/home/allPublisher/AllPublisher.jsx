// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import autoplay styles
import { useQuery } from "@tanstack/react-query";

import "./styles.css";

// Import required modules
import { FreeMode, Pagination, Autoplay } from "swiper/modules";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Heading from "../../../../components/Heading";

export default function AllPublisher() {
  const axiosSecure = useAxiosSecure();
  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/publisher`);
      return data;
    },
  });

  return (
    <div className="my-14">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        freeMode={true}
        loop={true} // Enable infinite sliding
        autoplay={{
          delay: 0, // No delay for continuous motion
          disableOnInteraction: false, // Keep autoplay running after user interaction
        }}
        speed={7000} // Adjust sliding speed (higher means slower)
        modules={[FreeMode, Pagination, Autoplay]} // Include Autoplay module
        className="mySwiper"
      >
        {publishers.map((pub) => (
          <SwiperSlide key={pub._id} className="flex justify-center  my-3">
            <div className=" w-full max-w-xs bg-gray-100/50 transition-all duration-200 rounded-md shadow-sm p-5 flex flex-col items-center gap-4 hover:shadow-md ">
              <div className=" md:h-28 h-24 flex justify-center items-center rounded-full overflow-hidden">
                <img
                  src={pub.logo}
                  alt={pub.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-700">{pub.label}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
