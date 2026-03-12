import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

const Pagination = ({ filter, setFilter }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // 1. Sync internal state with URL on mount or URL change
  useEffect(() => {
    const pageFromPath = parseInt(searchParams.get("page")) || 1;
    if (pageFromPath !== filter.page) {
      setFilter((prev) => ({ ...prev, page: pageFromPath }));
    }
  }, [searchParams]);

  const updatePage = (newPage) => {
    if (newPage < 1) return;

    // Update URL - This becomes the source of truth
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    navigate(`?${params.toString()}`);
    
    // Update parent state
    setFilter((prev) => ({ ...prev, page: newPage }));
  };

  // Determine the start of our 10-page window
  // This keeps the current page roughly in the middle or starts at 1
  const windowStart = Math.max(1, filter.page - 5);
  const pages = Array.from({ length: 10 }, (_, i) => windowStart + i);

  return (
    <section className="max-w-4xl my-4">
      <ul className="flex gap-x-2 items-center">
        {/* Previous Button */}
        <li
          onClick={() => updatePage(filter.page - 1)}
          className="border px-3 py-1 cursor-pointer hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </li>

        {/* Dynamic Page Numbers */}
        {pages.map((pageNum) => (
          <li
            key={pageNum} // Stable key
            onClick={() => updatePage(pageNum)}
            className={`border size-10 flex items-center justify-center cursor-pointer transition-colors
              ${pageNum === filter.page 
                ? "bg-red-500 text-white border-red-500" 
                : "bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            {pageNum}
          </li>
        ))}

        {/* Next Button */}
        <li
          onClick={() => updatePage(filter.page + 1)}
          className="border px-3 py-1 cursor-pointer hover:bg-gray-100"
        >
          Next
        </li>
      </ul>
    </section>
  );
};

export default Pagination;