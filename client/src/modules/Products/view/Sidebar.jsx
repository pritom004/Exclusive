import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { setFilter } from "../../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Range, getTrackBackground } from "react-range";
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

  const { filter } = useSelector((state) => state.product);
  const dispatch = useDispatch();

const {allProducts} = useSelector(state => state.product)

const MAX = allProducts?.data?.reduce((acc, curr) => acc = acc < curr.price? curr.price : acc, 0) ||1000;
const [values, setValues] = useState([10, 200]);
const MIN = 0;

// Adding Url search params to browser
  useEffect(() => {
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

 // Initial Load or Reload 
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
      // q: params.get("q"),
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

  const handleRange = (values) => {
   // update filter object
   // use update filter, spreed filter
    const newFilter = { ...filter };
    
    newFilter.minPrice = values[0];
    newFilter.maxPrice = values[1];
    
    updateFilters(newFilter);
    dispatch(setFilter(newFilter));
  }

  return (
    <div className="h-screen space-y-5">
      <div className="border border-gray-500 shadow-xs py-4 px-2.5">
        <h1 className="mb-4 text-xl font-semibold">Filter By Price</h1>
        <div className="w-full px-2 my-4 space-y-3">
      <h3 className="flex justify-between">
        <span>${values[0]}</span>  - <span> ${values[1]}</span></h3>

        <Range
        step={10}
        min={MIN}
        max={MAX}
        values={values}
        onChange={handleRange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              borderRadius: '4px',
              background: getTrackBackground({
                values,
                colors: ['#ccc', '#007bff', '#ccc'],
                min: MIN,
                max: MAX,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '20px',
              width: '20px',
              borderRadius: '50%',
              backgroundColor: '#007bff',
            }}
          />
        )}
      />
  
    </div>
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
          {colors.map((color) => {
            const accentMap = {
              red: "accent-red-500",
              green: "accent-green-500",
              blue: "accent-blue-500",
              white: "accent-white",
              gray: "accent-gray-500",
              black: "accent-black"
            };
            return (
            <li key={color} className="flex items-center gap-3.5">
              <input
                name="color"
                type="checkbox"
                id={color}
                value={color}
                checked={filter.color.includes(color)}
                className={accentMap[color]}
                onChange={handleChange}
              />
              <label htmlFor={color}>{color.toUpperCase()}</label>
            </li>
          )})}
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
