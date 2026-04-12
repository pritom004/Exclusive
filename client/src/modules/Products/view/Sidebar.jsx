import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { setFilter } from "../../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
const colors = ["red", "green", "blue", "white", "gray", "black"];

const categories = ["All", "Shoes", "Clothing", "Pant", "Jens"];

const sizes = ["S", "M", "L", "X", "XL"];

const Sidebar = () => {
  //Provide existing search params to state and URLSearchParams
  const [searchParams] = useSearchParams();
  //Used to modified it first and than change the search params
  const params = new URLSearchParams(searchParams);
  //Used to navigate or add the search params
  const navigate = useNavigate();

  const {filter} = useSelector(state => state.product)
  const dispatch = useDispatch()
  

  useEffect(() => {
    //If there are no search params in the url add them with default values
    if (!searchParams.toString()) {
      Object.entries(filter).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => params.append(key, v));
        } else {
          params.set(key, value);
        }
      });
    }
    navigate(`?${params.toString()}`);
  }, []);

  useEffect(() => {
    const newFilter = {
      sort: params.get("sort") || "newest",
      limit: Number(params.get("limit")) || 10,
      minPrice: Number(params.get("minPrice")) || 0,
      maxPrice: Number(params.get("maxPrice")) || 10000,
      status: params.get("status") || "all",
      color: params.getAll("color"),
      size: params.getAll("size"),
      category: params.get("category") || "",
      page: Number(params.get("page")) || 1,
      q: params.get("q")
    };

    dispatch(setFilter(newFilter));
  }, []);

  //Use to update params with filter object
  const updateFilters = (filters) => {
    const newParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.map((v) => newParams.append(key, v));
      } else {
        newParams.set(key, value);
      }
    });
 

    navigate(`?${newParams.toString()}`);
  };

  //Handle on the input changes using one onChange handler
  const handleChange = (e) => {
    const input = e.target;
    const newFilter = { ...filter };

    if (input.type === "checkbox") {
      if (input.checked) {
        newFilter[input.name] = [...newFilter[input.name], input.value];
      } else {
        newFilter[input.name] = newFilter[input.name]?.filter(
          (v) => v !== input.value,
        );
      }
    }

    if (input.type === "radio") {
      newFilter[input.name] = input.value;
    }
    updateFilters(newFilter);
    dispatch(setFilter(newFilter));
  };

  return (
    <div className="h-screen space-y-5">
     <div className="border border-gray-500 shadow-xs py-4 px-2.5 grow">
        <h1 className="mb-4 text-xl font-semibold">Filter By Price</h1>
        <div className="flex grow gap-6 items-center">
        <span>${filter?.minPrice}</span> -
        <span>${filter?.maxPrice}</span>
        </div>
        <input type="range" className="mx-auto my-3"/>
        <div className="flex gap-2 justify-between">
          <button className="rounded text-sm md:text-base cursor-pointer px-4 py-1.5 border border-gray-200 shadow-xs">
    Reset
          </button>
          <button className="rounded text-sm md:text-base  shadow-xs cursor-pointer px-4 py-1.5  text-white bg-red-600/70">
      Apply
          </button>
        </div>
      </div>
      <div className="border border-gray-500 shadow-xs py-4 px-2.5 ">
        <h1 className="mb-4 text-xl font-semibold">Filter By Colors</h1>
        <ul>
          {colors.map((color) => (
            <li key={color} className="flex items-center gap-3.5">
              <input
                name="color"
                type="checkbox"
                id={color}
                value={color}
                checked={filter.color.includes(color)}
                style={{ accentColor: color }}
                onChange={handleChange}
              />
              <label htmlFor={color}>{color.toUpperCase()}</label>
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-gray-500 shadow-xs py-4 px-2.5">
        <h1 className="mb-4 text-xl font-semibold">Filter By Sizes</h1>
        <ul>
          {sizes.map((size) => (
            <li key={size} className="flex items-center gap-3.5">
              <input
                name="size"
                checked={filter.size.includes(size)}
                value={size}
                type="checkbox"
                id={size}
                onChange={handleChange}
              />

              <label htmlFor={size}>{size.toUpperCase()}</label>
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-gray-500 shadow-xs py-4 px-2.5">
        <h1 className="mb-4 text-xl font-semibold">Categories</h1>
        <ul>
          {categories.map((category) => (
            <li key={category} className="flex items-center gap-3.5">
              <input
                name="category"
                type="radio"
                value={category}
                checked={filter.category === category}
                onChange={handleChange}
                id={category}
              />
              <label htmlFor={category}>{category.toUpperCase()}</label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
