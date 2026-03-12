import React, { useState } from "react";
import { Link } from "react-router";
import Sidebar from "../modules/Products/view/Sidebar";
import SortOptions from "../modules/Products/components/SortOptions";
import ProductsGrid from "../modules/Products/view/ProductsGrid";
import Pagination from "../modules/Products/components/Pagination";

const Products = () => {

    //Use to update or maintain the state of input elements
  const [filter, setFilter] = useState({
    sort: "newest",
    limit: 10,
    minPrice: 0,
    maxPrice: 10000,
    status: "all",
    color: [],
    size: [],
    category: "",
    page: 1
  });

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h4 className="flex gap-x-3 text-gray-600">
        <Link to="/">Home</Link>/
        <Link to="/products" className="text-black">
          Products
        </Link>
      </h4>
       <nav className="w-full flex justify-end mb-5">
        <SortOptions filter={filter} setFilter={setFilter} />
       </nav>
      

      <main className="flex gap-x-20">
        <Sidebar filter={filter} setFilter={setFilter}/>
        <ProductsGrid filter={filter}/>
      </main>

      <div className="flex flex-row justify-center my-20">
        <Pagination filter={filter} setFilter={setFilter} />
      </div>
    </div>
  );
};

export default Products;
