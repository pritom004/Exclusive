import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Sliders = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
    >
      <SwiperSlide>
        <img
          className="sm:max-w-190 md:max-w-205 lg:max-w-240 xl:max-w-355"
          src="banner1.jpeg"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="sm:max-w-190 md:max-w-205 lg:max-w-240 xl:max-w-355"
          src="banner3.jpeg"
          alt="sdf"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          className="sm:max-w-190 md:max-w-205 lg:max-w-240 xl:max-w-355"
          src="banner2.jpeg"
          alt="sdf"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Sliders;
