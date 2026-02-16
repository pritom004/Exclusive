import React, { useEffect, useState } from "react";
import { MoveRight, MoveLeft } from "lucide-react";
import Cart from "../components/Cart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useRef } from "react";
import { products } from "../../../components/data";

import "swiper/css";
import "swiper/css/navigation";
import Button from "../../../components/ui/Button";


const FlashSaleSection = () => {
  const swiperRef = useRef(null);


  
  const [saleTime, setSaleTime] = useState(60 * 60 * 24 * 4);
  const days = Math.floor(saleTime / (60 * 60 * 24));
  const hours = Math.floor((saleTime % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((saleTime % (60 * 60)) / 60);
  const seconds = saleTime % 60;

  useEffect(() => {
    if (saleTime <= 0) return;
    const timer = setInterval(() => setSaleTime((prev) => prev - 1), 1000);
    console.log("Render ");

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <section className="container mx-auto px-4 mt-40">
      <div className="flex gap-x-4 items-center mb-4">
        <span className="bg-red-600 w-4.5 h-9 rounded"></span>{" "}
        <h4 className="font-semibold text-red-600 text-lg">Todays's</h4>
      </div>
      <div className="flex justify-between mb-6 gap-4 flex-wrap">
        <nav className="flex flex-col md:flex-row gap-4 justify-between min-w-xl ">
          <h3 className="text-4xl font-bold tracking-wider">Flash Sales</h3>
          <div className="flex gap-x-4 md:justify-center items-center">
            <div>
              <p className="text-sm font-semibold">Days</p>
              <h6 className="text-4xl font-bold">0{days}</h6>
            </div>
            <span className="text-red-600 text-3xl">:</span>
            <div>
              <p className="text-sm font-semibold">Hours</p>
              <h6 className="text-4xl font-bold">{hours}</h6>
            </div>
            <span className="text-red-600 text-3xl">:</span>
            <div>
              <p className="text-sm font-semibold">Minutes</p>
              <h6 className="text-4xl font-bold">{minutes}</h6>
            </div>
            <span className="text-red-600 text-3xl">:</span>
            <div>
              <p className="text-sm font-semibold">Seconds</p>
              <h6 className="text-4xl font-bold">{seconds}</h6>
            </div>
          </div>
        </nav>
        <nav className="space-x-4">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="p-2 bg-gray-200/80 rounded-full cursor-pointer "
          >
            {" "}
            <MoveLeft />
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="p-2 bg-gray-200/80 cursor-pointer rounded-full"
          >
            <MoveRight />
          </button>
        </nav>
      </div>

      <div className="flex mb-12">
        <Swiper
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={24}
          slidesPerView={4}
          breakpoints={{
            50: { slidesPerView: 2 },
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 6 },
          }}
        >
          {products.map((product) => (
            <SwiperSlide>
              <Cart
              key={product.id}
                url={product.url}
                price={product.price}
                discount={product.discount}
                alt={product.name}
                name={product.name}
                ratings={product.ratings}
                reviews={product.reviews}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-center">
        <Button
        className="mb-12"
        >
        <a href="/products">View All Products</a>
      </Button>
      </div>
      <div className="border-b border-gray-300 container mx-auto mb-4"></div>
    </section>
  );
};

export default FlashSaleSection;
