import React from "react";
import {
  useStripe,
  useElements,
  PaymentElement
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import Button from "../../../components/ui/Button";

const CheckoutForm = ({clientSecret}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await elements.submit();

    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${import.meta.env.VITE_FRONTEND_URL}/`,
      },
      redirect: "if_required",
    });

    if (result.error) {
      toast.error(result.error.message);
      return;
    }

    // `redirect: 'if_required'` means Stripe may redirect for required actions (e.g., 3DS).
    // If we get a result back, we can safely show a success toast when the payment succeeded.
    if (result.paymentIntent?.status === "succeeded") {
      toast.success("Order confirmed successfully");
    }
  };

  return (
    <div className="grow">
      <PaymentElement />
      <Button className="mt-5.5 bg-black" onClick={handleSubmit}  disabled={!stripe}>Submit</Button>
    </div>
  );
};

export default CheckoutForm;
