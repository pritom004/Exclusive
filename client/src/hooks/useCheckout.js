import { useDispatch, useSelector } from "react-redux";
import { createCheckout, fetchCheckout, createPaymentIntent } from "../redux/slices/checkoutSlice";

export default function useCheckout() {
  const checkoutState = useSelector((state) => state.checkout);
  const dispatch = useDispatch();

  const createCheckoutUtil = async (checkoutData) => {
    return dispatch(createCheckout(checkoutData));
  };

  const fetchCheckoutUtil = async () => {
    return dispatch(fetchCheckout());
  };

  const createPaymentIntentUtil = async (orderDetails) => {
    return dispatch(createPaymentIntent(orderDetails));
  };

  return { 
    ...checkoutState,
    createCheckoutUtil, 
    fetchCheckoutUtil, 
    createPaymentIntentUtil 
  };
}
