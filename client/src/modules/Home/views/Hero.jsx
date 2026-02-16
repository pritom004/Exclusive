import { ChevronRight } from "lucide-react";
import React from "react";
import Sliders from "../components/Sliders";

const Hero = () => {
  return (
    <section className="flex px-4 max-h-1/5 mb-2 gap-x-8 justify-between">
      <nav className="space-y-3 pl-8 pr-2 py-7 border-r text-sm lg:text-base border-gray-300 hidden lg:block">
        <a href="" className="flex items-center gap-4 justify-between">
          Woman's Fashion <ChevronRight />
        </a>
        <a href="" className="flex items-center gap-4 justify-between">
          Men's Fashion <ChevronRight />
        </a>
        <a href="" className="block">
          Electronics{" "}
        </a>
        <a href="" className="block">
          Home & Lifestyle
        </a>
        <a href="" className="block">
          Medicine
        </a>
        <a href="" className="block">
          Sports & Outdoor
        </a>
        <a href="" className="block">
          Baby's & Toys
        </a>
        <a href="" className="block">
          Groceries & Pets
        </a>
        <a href="" className="block">
          Health & Beauty
        </a>
      </nav>


    <nav className="max-w-375 pt-4 mx-auto overflow-x-hidden" >
        <Sliders />
    </nav>

    </section>
  );
};

export default Hero;
