import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchRelatedProducts } from "../../../redux/slices/productSlice";
import Cart from "../../Home/components/Cart";

const RelatedProducts = (category) => {
  const dispatch = useDispatch();
  const { relatedProducts } = useSelector((state) => state.product);

  useEffect(() => {
    if (category) {
      dispatch(fetchRelatedProducts(category.category));
    }
  }, []);

  

  return (
    <section className="my-20">
      <div className="flex gap-x-4 items-center mb-4">
        <span className="bg-red-600 w-4.5 h-9 rounded"></span>{" "}
        <h4 className="font-semibold text-red-600 text-lg">Todays's</h4>
      </div>

      <div className="flex gap-8">
        {relatedProducts?.length > 0 &&
          relatedProducts.map((product) => (
            <Cart
              key={product._id}
              url={product?.images?.[0]?.url}
              price={product.price}
              discount={product.discount}
              alt={product?.images?.[0]?.alt}
              name={product.name}
              ratings={product.ratings}
              reviews={product.reviews}
              id={product._id}
                color={product.colors[0]}
                size={product.sizes[0]}
            />
          ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
