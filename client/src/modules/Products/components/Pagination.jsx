import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../../redux/slices/productSlice";

const Pagination = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();


  const { allProducts } = useSelector((state) => state.product);
  const {filter} = useSelector(state => state.product)
  const dispatch = useDispatch()

  useEffect(() => {
    const startPage = parseInt(searchParams.get("page")) || 1;

    if (startPage !== filter.page) {
     dispatch(setFilter({ ...filter, page: startPage }));
    }
  }, [searchParams]);

  const windowPage = Math.max(1, filter.page - 5);

  const pages = Array.from({ length: 10 }, (_, i) => i + windowPage);

  const updatePage = (newPage) => {
   
    if (newPage < 1) return;
    const params = new URLSearchParams(searchParams);

    params.set("page", newPage);

    navigate(`?${params.toString()}`);
    dispatch(setFilter({ ...filter, page: newPage }));
  };

  return (
    <section className="max-w-4xl my-4 overflow-x-auto">
      <div className="flex gap-x-2 items-center">
        {/* Previous Button */}
        <button
          onClick={() => updatePage(filter.page - 1)}
          className="border px-3 py-1 cursor-pointer hover:bg-gray-100 disabled:opacity-50"
        >
          Prev
        </button>

        {/* Dynamic Page Numbers */}
        {pages.map((pageNum) => (
          <button
            disabled={pageNum > allProducts?.totalPage}
            key={pageNum} // Stable key
            onClick={() => updatePage(pageNum)}
            className={`border disabled:opacity-40 shrink-0 size-10 flex items-center justify-center cursor-pointer transition-colors
              ${
                pageNum === filter.page
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
          >
            {pageNum}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => updatePage(filter.page + 1)}
          disabled={filter.page + 1 >= allProducts?.totalPage}
          className="border disabled:opacity-40 px-3 py-1 cursor-pointer hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Pagination;
