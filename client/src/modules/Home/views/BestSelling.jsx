import React, { useEffect } from "react";
import Button from "../../../components/ui/Button";
import Cart from "../components/Cart";
import { useDispatch, useSelector } from "react-redux";
import { fetchBestSellingProducts } from "../../../redux/slices/productSlice";



const BestSelling = () => {
  
  const {bestSellingProducts} = useSelector(state => state.product)
  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(fetchBestSellingProducts())
  }, [])

  return (
    <section className="container mx-auto px-4 my-20">
      <div className="flex gap-x-4 items-center mb-9">
        <span className="bg-red-600 w-4.5 h-9 rounded"></span>{" "}
        <h4 className="font-semibold text-red-600 text-lg">Categories</h4>
      </div>

      <div className="flex flex-col md:flex-row justify-between">
        <h4 className="text-4xl tracking-wider mb-12 font-semibold">
          Best Selling Products
        </h4>
        <Button className="mb-12">
            <a href="/products">View All</a>
        </Button>
      </div>

<div className="flex flex-wrap justify-between">
    {bestSellingProducts?.map((product) => (
         <Cart
                key={product.id}
                url={ product?.images?.[0]?.url}
                price={product.price}
                discount={product.discount}
                alt={product?.images?.[0]?.alt}
                name={product.name}
                ratings={product.ratings}
                reviews={product.reviews}
                id={product._id}
              />
    ))}
</div>

    </section>
  );
};

export default BestSelling;
