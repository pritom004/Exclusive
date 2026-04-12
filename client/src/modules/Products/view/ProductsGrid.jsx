import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "../../../redux/slices/productSlice";
import Cart from "../../Home/components/Cart";
import EmptyProducts from "../components/EmptyProducts";

const ProductsGrid = () => {
  const dispatch = useDispatch();
  const { allProducts, loading } = useSelector((state) => state.product);
  const {filter} = useSelector(state => state.product)

  useEffect(() => {
    dispatch(fetchAllProducts(filter));
  }, [filter]);



  return (allProducts && allProducts.data.length > 0) ? (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-16 ">
        {allProducts?.data &&
          allProducts?.data.length > 0 &&
          allProducts?.data?.map((product) => (
            <Cart
              key={product._id}
              url={product.images[0].url}
              alt={product.images[1].alt}
              name={product.name}
              price={product.price}
              discount={product.discount}
              ratings={product.ratings}
              id={product._id}
              className="mx-auto"
              loading={loading}
            />
          ))}
      </div>
    </section>
  ) : <EmptyProducts />;
};

export default ProductsGrid;
