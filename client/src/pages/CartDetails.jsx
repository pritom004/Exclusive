import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeItem, updateItem } from "../redux/slices/cartSlice";
import Button from "../components/ui/Button";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";

const CartDetails = () => {
  const dispatch = useDispatch();
  const { cart, loading } = useSelector((state) => state.cart);
  const { user, guestId } = useSelector((state) => state.auth);
  const navigate = useNavigate()  

  useEffect(() => {
    let query = user ? { userId: user._id } : { guestId };
   
    
    dispatch(fetchCart(query));
  }, [user, guestId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleRemove = (productId) => {
     let query = user ? { userId: user._id } : { guestId };

     dispatch(removeItem({productId, ...query}))
  }




  const handleUpdateItem = (e, productId) => {


    let query = user ? { userId: user._id } : { guestId };

      dispatch(updateItem({
        productId,
        quantity: e.target.value,
        ...query,
      }))
  }


  const handleCheckout = () => {
    if(!user){
      navigate("/login?redirect=checkout")
    }    
  }


  return (
    <div className="max-w-6xl mx-auto py-16 px-6">
      <h4 className="flex gap-x-3 text-gray-600 mb-14 ">
        <Link to="/">Home</Link>/
        <Link to="/cart" className="text-black">
          Cart
        </Link>
      </h4>

      <nav className="mx-5">
        <div className="space-y-4 mb-7">
          <div
            id="header"
            className="w-full overflow-x-auto rounded py-3 px-8 border border-gray-200 gap-3 shadow shadow-gray-50 grid grid-cols-[3fr_1fr_1fr_1fr]"
          >
            <h6 className="grow">Product</h6>
            <p >Price</p>

            <p >Quantity</p>
            <p >Subtotal</p>
          </div>

          {cart &&
            cart.items.length > 0 &&
            cart.items.map((item) => (
              <div
                key={item.productId}
                className="w-full rounded grid grid-cols-[3fr_1fr_1fr_1fr] py-3 px-8 border gap-4 overflow-x-auto border-gray-200 shadow shadow-gray-50 "
              >
                <div className="flex gap-4 items-center">
                  <img
                    className="size-10"
                    src={item.image.url}
                    alt={item.name}
                  />
                  <h6 className="truncate max-w-28 ">{item.name}</h6>
                </div>
                <p>{item.price}</p>
                <input type="number" className="border-2 border-gray-600/30 rounded outline-none w-12 p-1 " onChange={(e) => handleUpdateItem(e, item.productId)} value={item.quantity}/>
                <div className="flex items-center justify-between gap-3">
                  <p>{item.subTotal}</p>
                  <button type="button" onClick={() => handleRemove(item.productId)} className="cursor-pointer">
                    <MdOutlineCancel className="size-6 text-red-600/70" />
                  </button>
                </div>
              </div>
            ))}
        </div>
        <Link to="/" className="px-8 py-2.5 border rounded border-gray-500/70">
          Return To Shop
        </Link>

        <div className="mt-20 flex-wrap flex gap-4 items-start justify-between">
          <div className="flex gap-x-4 items-center">
            <input
              type="text"
              className="border rounded px-4 md:px-5 py-2 md:py-2.5 outline-none"
              placeholder="Coupon Code"
            />
            <Button>Apply Coupon</Button>
          </div>

          <div className="max-w-sm grow px-3.5 py-6 border-2 rounded border-black">
            <h6 className="text-xl font-semibold mb-6">Cart Total</h6>
            <div className="grow mb-4 flex justify-between">
              <p>Subtotal:</p>
              <p>${Math.round(cart?.totalPrice)}</p>
            </div>
            <div className="border-b mb-4 border-gray-400"></div>

            <div className="grow mb-4 flex justify-between">
              <p>Shipping:</p>
              <p>Free</p>
            </div>

            <div className="border-b mb-4 border-gray-400"></div>

            <div className="grow mb-4 flex justify-between">
              <p>Total</p>
              <p>${Math.round(cart?.totalPrice)}</p>
            </div>

            <div className="flex justify-center grow">
              <Button onClick={handleCheckout}>Process to checkout</Button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CartDetails;
