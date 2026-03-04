import React, { useEffect } from "react";
import { Link } from "react-router";
import Input from "../components/common/Input";
import { useSelector, useDispatch } from "react-redux";
import { fetchCheckout } from "../redux/slices/checkoutSlice";
import Button from "../components/ui/Button";
import ApplyCoupon from "../components/common/ApplyCoupon";
import { stripePromise } from "../utils/loadStripe";
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from "../modules/Checkout/components/CheckoutForm";

const Checkout = () => {
  const dispatch = useDispatch();
  const { checkout, clientSecret } = useSelector((state) => state.checkout);

  useEffect(() => {
    dispatch(fetchCheckout);
  }, []);

  return (
    <div className="my-14 max-w-7xl mx-auto px-6">
      <h4 className="flex mb-16 gap-x-3 text-gray-600">
        <Link to="/">Home</Link>/
        <Link to="/account" className="text-gray-600">
          My Account
        </Link>{" "}
        /
        <Link to="/products" className="text-gray-600">
          Products
        </Link>{" "}
        /
        <Link to="/cart" className="text-gray-600">
          View Cart
        </Link>{" "}
        /
        <Link to="/checkout" className="text-black">
          Checkout
        </Link>
      </h4>

      <h2 className="tracking-wide text-black text-[2.5rem] font-semibold mb-8">
        Billing Details
      </h2>
      <form className="flex grow my-6 flex-wrap gap-y-6 gap-x-10 justify-between ">
        {clientSecret? <Elements stripe={stripePromise} options={{clientSecret}}>
          <CheckoutForm />
        </Elements>: (<nav className="grow max-w-xl space-y-6">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-1 text-gray-400 text-lg"
            >
              First Name <span className="text-red-400">*</span>
            </label>
            <Input id="firstName" className="w-full rounded-md" />
          </div>

          <div>
            <label
              htmlFor="companyName"
              className="block mb-1 text-gray-400 text-lg"
            >
              Company Name
            </label>
            <Input id="companyName" className="w-full rounded-md" />
          </div>

          <div>
            <label
              htmlFor="streetAddress"
              className="block mb-1 text-gray-400 text-lg"
            >
              Street Address<span className="text-red-400">*</span>
            </label>
            <Input id="streetAddress" className="w-full rounded-md" />
          </div>

          <div>
            <label
              htmlFor="streetAddress"
              className="block mb-1 text-gray-400 text-lg"
            >
              Apartment, floor, ect. (optional)
            </label>
            <Input id="streetAddress" className="w-full rounded-md" />
          </div>

          <div>
            <label
              htmlFor="townCity"
              className="block mb-1 text-gray-400 text-lg"
            >
              Town/City<span className="text-red-400">*</span>
            </label>
            <Input id="townCity" className="w-full rounded-md" />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="block mb-1 text-gray-400 text-lg"
            >
              Phone Number<span className="text-red-400">*</span>
            </label>
            <Input id="phoneNumber" className="w-full rounded-md" />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 text-gray-400 text-lg">
              Email Address<span className="text-red-400">*</span>
            </label>
            <Input id="email" className="w-full rounded-md" />
          </div>

          <div className="flex items-center gap-4">
            <input type="checkbox" className="text-red-500 active:bg-red-600" />
            <p className="text-lg tracking-wide">
              Save this information for faster check-out next time
            </p>
          </div>
        </nav>)}

        <nav className="sm:min-w-sm mt-8 md:min-w-md">
          <div>
            {checkout && checkout?.items.length > 0 && (
              <div className="space-y-4.5 mb-8 max-h-96 px-1.5 overflow-y-auto">
                {checkout.items.map((item) => (
                  <div
                    key={item.productId}
                    className="grid items-center grid-cols-[1fr_1fr_2fr]"
                  >
                    <label>
                      <img
                        className="size-16"
                        src={item.image.url}
                        alt={item.image.alt ?? image.name}
                      />
                    </label>
                    <span className="text-lg text-black">{item.name}</span>
                    <span className="text-end text-lg text-black">
                      {item.subTotal}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mb-8">
            <div className="w-full items-center flex justify-between text-lg mb-2.5">
              <span>Subtotal:</span>
              <span>${checkout?.totalPrice.toFixed(2)}</span>
            </div>

            <div className="border-b mb-2.5 w-full border-gray-500"></div>

            <div className="w-full items-center flex justify-between text-lg mb-2.5">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <div className="border-b mb-2.5 w-full border-gray-500"></div>

            <div className="w-full items-center flex justify-between text-lg mb-2.5">
              <span>Total:</span>
              <span>${checkout?.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-4 justify-between mb-8 items-center">
            <div className="flex items-center gap-3">
              <input type="radio" className="size-5 " />
              <span className="text-xl text-start font-semibold">Card</span>
            </div>
            <img className="w-16 self-end" src="/visa-master.png" alt="card" />
          </div>

          <ApplyCoupon className="my-6" />

          <Button>Place Order</Button>
        </nav>
      </form>
    </div>
  );
};

export default Checkout;
