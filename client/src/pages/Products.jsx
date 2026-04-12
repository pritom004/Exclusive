import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Sidebar from "../modules/Products/view/Sidebar";
import SortOptions from "../modules/Products/components/SortOptions";
import ProductsGrid from "../modules/Products/view/ProductsGrid";
import Pagination from "../modules/Products/components/Pagination";
import { setFilter } from "../redux/slices/productSlice";
import { IoFilterOutline } from "react-icons/io5";
import { X } from "lucide-react";
import { useSelector } from "react-redux";

const Products = () => {
  // const [filter, setFilter] = useState();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  const filterRef = useRef();

  const handleMouseDown = (e) => {

    if(filterRef.current && !filterRef.current.contains(e.target)){
      setIsSidebarOpen(false)
    }

  };  

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h4 className="flex gap-x-3 text-gray-600 mb-6">
        <Link to="/">Home</Link>/
        <Link to="/products" className="text-black">
          Products
        </Link>
      </h4>
      <nav
        id="filterSidebar"
        className="w-full gap-4 flex justify-between my-4 sm:hidden mb-5"
      >
        <button
          type="button"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-gray-100 border border-gray-300 px-4 py-1.5 flex items-center gap-2"
        >
          <IoFilterOutline />
          Filter
        </button>
        <SortOptions />
      </nav>

      <main className="flex gap-x-8 md:gap-x-10 lg:gap-x-20 my-10">
        <div
          ref={filterRef}
          className={`${!isSidebarOpen ? "-translate-x-full" : "translate-x-0"} duration-300 sm:translate-x-0 fixed sm:static z-50 bg-white left-0  inset-y-0 px-5 w-1/2 md:max-w-60`}
        >
          <div className="relative block sm:hidden">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute -right-5 cursor-pointer -top-9 text-red-600 "
            >
              <X className="size-7.5" />{" "}
            </button>
          </div>
          <Sidebar/>
        </div>
        <ProductsGrid  />
      </main>

      <div className="flex flex-row justify-center mb-10">
        <Pagination  />
      </div>
    </div>
  );
};

export default Products;
