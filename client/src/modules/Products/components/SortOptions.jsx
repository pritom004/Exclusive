import React from 'react'
import { useNavigate, useSearchParams } from 'react-router';

export const SORT_OPTIONS = [
  {
    id: 1,
    value: "discount_desc",
    label: "Highest Discount",
  },
  {
    id: 2,
    value: "price_asc",
    label: "Price: Low to High",
  },
  {
    id: 3,
    value: "price_desc",
    label: "Price: High to Low",
  },
  {
    id: 4,
    value: "newest",
    label: "Newest First",
  },
  {
    id: 5,
    value: "rating_desc",
    label: "Highest Rated",
  },
];


const SortOptions = ({filter, setFilter}) => {

    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

  const handleSelect = (e) => {
    const sort = e.target.value;
    if (!sort) return;
    const params = new URLSearchParams(searchParams);
    params.set("sort", sort);
    setFilter(prev => ({
      ...prev,
      sort: sort
    }))
    navigate(`?${params.toString()}`);
  };


    return (
  
        <div className="flex w-51 p-1.5 shadow-xs justify-between border border-gray-500">
          <select
            name="filter"
            id="sort"
            className="w-full"
            onChange={handleSelect}
            value={filter.sort}
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.id} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
    
  )
}

export default SortOptions;
