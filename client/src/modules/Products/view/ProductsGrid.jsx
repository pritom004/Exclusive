import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../../redux/slices/productSlice";
import Cart from "../../Home/components/Cart";
import EmptyProducts from "../components/EmptyProducts";

import Skeleton from "../../Home/components/Skeleton";

const ProductsGrid = () => {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.product);
  const {filter} = useSelector(state => state.product)

  useEffect(() => {
    dispatch(fetchAllProducts(filter));
  }, [filter]);


  if (loading) {
    return (
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-16">
          <Skeleton count={1} className="h-60" />
          <Skeleton count={1} className="h-60" />
          <Skeleton count={1} className="h-60" />
          <Skeleton count={1} className="h-60" />
          <Skeleton count={1} className="h-60" />
          <Skeleton count={1} className="h-60" />
        </div>
      </section>
    );
  }

  return (allProducts && allProducts.data?.length > 0) ? (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-16 ">
        {allProducts?.data?.map((product) => (
           <Cart
           key={product._id}
           product={product}
          />
        ))}
      </div>
    </section>
  ) : <EmptyProducts />;
};

export default ProductsGrid;
