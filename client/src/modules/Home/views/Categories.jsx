import React from "react";
import {Navigation} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import { useSwiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation"


import {
  Smartphone,
  MonitorCloud,
  Camera,
  Gamepad,
  Watch,
  Headset,
  MoveLeft,
  MoveRight,
} from "lucide-react";
const categories = [
  {
    id: 1,
    name: "Phones",
    icon: Smartphone,
  },
  {
    id: 2,
    name: "Computers",
    icon: MonitorCloud,
  },
  {
    id: 3,
    name: "SmartWatch",
    icon: Watch,
  },
  {
    id: 4,
    name: "Camera",
    icon: Camera,
  },
  {
    id: 5,
    name: "Headphone",
    icon: Headset,
  },
  {
    id: 6,
    name: "Gaming",
    icon: Gamepad,
  },
];

const Categories = () => {

    const swiperRef = useRef(null);

  return (
    <section className="container mx-auto px-4 mt-20">
      <div className="flex gap-x-4 items-center mb-9">
        <span className="bg-red-600 w-4.5 h-9 rounded"></span>{" "}
        <h4 className="font-semibold text-red-600 text-lg">Categories</h4>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <h4 className="text-4xl tracking-wider mb-12 font-semibold">Browse By Category</h4>
        <nav className="space-x-4">
          <button 
          onClick={() => swiperRef.current.slidePrev()}
          className="p-2 bg-gray-200/80 rounded-full cursor-pointer ">
            {" "}
            <MoveLeft />
          </button>

          <button 
          onClick={() => swiperRef.current.slideNext()}
          className="p-2 bg-gray-200/80 cursor-pointer rounded-full">
            <MoveRight />
          </button>
        </nav>
      </div>
      <div className="mb-12">
        <Swiper 
        onSwiper={(value) => swiperRef.current = value}
            modules={[Navigation]}
             breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
        >
            {categories.length > 0 && categories.map(category => (
                <SwiperSlide key={category.id}>
                    <div className="flex hover:bg-red-600 hover:text-white duration-300 flex-col justify-center items-center w-48 h-36 border border-gray-400 rounded-md shadow gap-y-6">
                    <category.icon className="size-12" />
                    <p className="text-lg">{category.name}</p>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
      </div>
       <div className="border-b border-gray-300 container mx-auto mb-4"></div>
    </section>
  );
};

export default Categories;
