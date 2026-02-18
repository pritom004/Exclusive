import React from "react";
import { Star, StarHalf, Heart, Eye } from "lucide-react";
import {Link} from "react-router";
import { FaStar, FaStarHalf } from "react-icons/fa";
const Cart = ({ url, alt, name, price, discount, ratings, reviews, id }) => {
  const calculateStart = (ratings) => {
    let result = [];

    for (let i = 0; i < Math.floor(ratings); i++) {
      result.push(<FaStar key={i} className="size-4 text-yellow-400" />);
    }

    if (ratings % 1 !== 0) {
      result.push(<FaStarHalf key="half" className="size-4 text-yellow-400" />);
    }

    return result;
  };


  
  return (
    <nav className="group">
       <Link to={`/products/${id}`}>
      <div className="relative max-w-60 mb-4 overflow-hidden grow-0 rounded justify-stretch">
        <img className="size-60 grow cursor-pointer" src={url} alt={alt} />
        {discount && discount >= 8 && <div className="text-white py-0.5 bg-red-600  w-14 text-center
        absolute top-3 left-2.5 rounded
        ">-{discount}%</div>}
        <div className="absolute gap-2.5 right-2 top-2 flex flex-col">
          <button className="bg-white rounded-full p-1">
            <Heart className="size-5 mx-auto" />
          </button>
          <button className="bg-white rounded-full p-1">
            <Eye className="size-5 mx-auto" />
          </button>
        </div>
        {/*TODO: Add "Add to cart button" */}
        <div className="absolute bottom-0 inset-x-0 bg-black h-0 duration-300 group-hover:h-10 flex items-center justify-center">
          <span className="text-white text-center hidden group-hover:block duration-300 cursor-pointer">
            Add To Cart
          </span>
        </div>
      </div>
      <h6 className="text-lg font-semibold">{name}</h6>
      <div className="flex gap-x-4 mb-2">
        <span className="text-red-600">${price}</span>
        <span className="text-gray-400 line-through">${price}</span>
      </div>
      {reviews > 0 &&<div className="flex items-center gap-x-2 w-52">
        <span className="flex gap-x-1.5">{...calculateStart(ratings)}</span>
        <span className="text-gray-500">({reviews})</span>
      </div>}
      </Link>
    </nav>
  );
};

export default Cart;
