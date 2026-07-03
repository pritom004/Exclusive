import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart, removeItem } from "../redux/slices/cartSlice";

export default function useCart() {
  
     const {cart} = useSelector(store => store.cart);
    const dispatch= useDispatch()
  
    const addToCartUtil = async (cartDetails) => {

        dispatch(addToCart(cartDetails))
  };

  const fetchCartsUtil = async (cartData) => {
    dispatch(fetchCart(cartData))
  };

  const removeItemUtil = async (cartData) => {
   
    dispatch(removeItem(cartData))
  };

  const getItem = (productId) => {
   
   return cart?.items?.find(item => item?.productId === productId);
  }

  return { addToCartUtil, fetchCartsUtil, removeItemUtil, getItem };
}
