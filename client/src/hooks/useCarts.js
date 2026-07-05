import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCart, removeItem, updateItem } from "../redux/slices/cartSlice";

export default function useCart() {
  const { cart, loading, error } = useSelector(store => store.cart);
  const dispatch = useDispatch();

  const addToCartUtil = async (cartDetails) => {
    return dispatch(addToCart(cartDetails));
  };

  const fetchCartsUtil = async (cartData) => {
    return dispatch(fetchCart(cartData));
  };

  const removeItemUtil = async (cartData) => {
    return dispatch(removeItem(cartData));
  };

  const updateItemUtil = async (cartData) => {
    return dispatch(updateItem(cartData));
  };

  const getItem = (productId) => {
    const result = cart?.items.find(item => item.productId === productId)
    return result;
  };

  return { cart, loading, error, addToCartUtil, fetchCartsUtil, removeItemUtil, updateItemUtil, getItem };
}
