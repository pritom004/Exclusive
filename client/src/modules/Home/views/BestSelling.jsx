import React from "react";
import Button from "../../../components/ui/Button";
import Cart from "../components/Cart";

const products = [
  {
    id: 1,
    name: "Wireless Headphone",
    price: 20,
    discount: 40,
    ratings: 4.5,
    reviews: 142,
    url: "product1.jpeg",
  },
  {
    id: 2,
    name: "Bluetooth Speaker",
    price: 35,
    discount: 25,
    ratings: 4.2,
    reviews: 98,
    url: "product1.jpeg",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: 15,
    discount: 30,
    ratings: 4.6,
    reviews: 210,
    url: "product1.jpeg",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 55,
    discount: 20,
    ratings: 4.7,
    reviews: 340,
    url: "product1.jpeg",
  },
  {
    id: 5,
    name: "Smart Watch",
    price: 80,
    discount: 35,
    ratings: 4.3,
    reviews: 175,
    url: "product1.jpeg",
  },

];

const BestSelling = () => {
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
    {products.map((product) => (
        <Cart key={product.id} url={product.url} alt={product.name} discount={product.discount} 
            ratings={product.ratings} price={product.price}
            reviews={product.reviews}
        />
    ))}
</div>

    </section>
  );
};

export default BestSelling;
