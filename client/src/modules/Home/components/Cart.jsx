import React from "react";
import { Star, StarHalf, Heart, Eye } from "lucide-react";
import {Link, useNavigate} from "react-router";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { addToCart } from "../../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";


const Cart = ({ url, alt, name, price, discount, ratings = [], reviews, id, color, size }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, guestId} = useSelector(state => state.auth)


  

  const handleAddToCart = () => {
  
 const query = user? {userId: user._id}: {guestId};


    dispatch(addToCart({
      productId: id,
      color,
      size,
      quantity: 1,
      ...query
    }))
  }


const getStarCounts = (ratings) => {
  if (!ratings.length) return { full: 0, half: 0, empty: 5 };

  const avg =
    ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

  const full = Math.floor(avg);
  const half = avg - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return { full, half, empty };
};

const { full, half, empty } = getStarCounts(ratings);
  
  return (
    <nav className="group">
       
      <div className="relative max-w-60 mb-4 overflow-hidden grow-0 rounded justify-stretch">
        <img className="size-60 grow cursor-pointer" onClick={() => navigate(`/products/${id}`)} src={url} alt={alt} />
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
          <button onClick={handleAddToCart} className="text-white text-center hidden group-hover:block duration-300 cursor-pointer">
            Add To Cart
          </button>
        </div>
      </div>
      <h6 className="text-lg font-semibold">{name}</h6>
      <div className="flex gap-x-4 mb-2">
        <span className="text-red-600">${(discount * 100 / price).toFixed(2)}</span>
        <span className="text-gray-400 line-through">${price}</span>
      </div>
   <div className="flex items-center gap-3">
       {<div className="flex gap-1">
      {Array.from({ length: full }).map((_, i) => (
        <FaStar key={`full-${i}`} className="size-4 text-yellow-400" />
      ))}

      {half === 1 && (
        <FaStarHalf key="half" className="size-4 text-yellow-400" />
      )}

      {Array.from({ length: empty }).map((_, i) => (
        <FaStar key={`empty-${i}`} className="size-4 text-gray-300" />
      ))}
    </div>} <span>({ratings.length})</span>
   </div>

    </nav>
  );
};

export default Cart;
