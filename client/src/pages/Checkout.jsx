import React, { useEffect } from "react";
import { Link } from "react-router";
import Input from "../components/common/Input";
import { useSelector, useDispatch } from "react-redux";
import {
  createPaymentIntent,
  fetchCheckout,
} from "../redux/slices/checkoutSlice";
import Button from "../components/ui/Button";
import ApplyCoupon from "../components/common/ApplyCoupon";
import { stripePromise } from "../utils/loadStripe";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../modules/Checkout/components/CheckoutForm";
import toast from "react-hot-toast";

const Checkout = () => {
  const dispatch = useDispatch();
  const { checkout, clientSecret } = useSelector((state) => state.checkout);

  useEffect(() => {
    dispatch(fetchCheckout);
  }, [dispatch]);

  console.log(checkout);

  const validateForm = (formData) => {
    const fullName = formData.get("fullName") || "";
    const streetAddress = formData.get("streetAddress") || "";
    const city = formData.get("city") || "";
    const phoneNumber = formData.get("phoneNumber") || "";
    const emailAddress = formData.get("email") || "";

    if (fullName.length < 3) return "Enter a valid name";
    if (streetAddress.length < 6) return "Enter a valid address";
    if (city.length < 2) return "Enter a valid city";
    if (phoneNumber.length < 6) return "Phone number is required";
    if (emailAddress.length < 6) return "Enter a valid email address";

    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log();

    const formData = new FormData(e.target);
    console.log(formData);

    const fullName = formData.get("fullName") || "";
    const streetAddress = formData.get("streetAddress") || "";
    const city = formData.get("city") || "";
    const phoneNumber = formData.get("phoneNumber") || "";
    const email = formData.get("email") || "";
    const companyName = formData.get("companyName") || "";
    const secondAddress = formData.get("secondAddress") || "";

    const isValidate = validateForm(formData);

    if (isValidate) {
      return toast.error(isValidate);
    }

    dispatch(
      createPaymentIntent({
        fullName,
        city,
        streetAddress,
        email,
        phoneNumber,
        companyName,
        secondAddress,
        checkoutId: checkout._id,
      }),
    );
  };

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
      <form
        onSubmit={handleSubmit}
        className="flex grow my-6 flex-wrap gap-y-6 gap-x-10 justify-between "
      >
        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm clientSecret={clientSecret}/>
          </Elements>
        ) : (
          <nav className="grow max-w-xl space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block mb-1 text-gray-400 text-lg"
              >
                Full Name <span className="text-red-400">*</span>
              </label>              <Input
                id="fullName"
                name="fullName"
                className="w-full rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="companyName"
                className="block mb-1 text-gray-400 text-lg"
              >
                Company Name
              </label>
              <Input
                id="companyName"
                name="companyName"
                className="w-full rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="streetAddress"
                className="block mb-1 text-gray-400 text-lg"
              >
                Street Address<span className="text-red-400">*</span>
              </label>
              <Input
                name="streetAddress"
                id="streetAddress"
                className="w-full rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="secondAddress"
                className="block mb-1 text-gray-400 text-lg"
              >
                Apartment, floor, ect. (optional)
              </label>
              <Input
                name="secondAddress"
                id="secondAddress"
                className="w-full rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="block mb-1 text-gray-400 text-lg"
              >
                Town/City<span className="text-red-400">*</span>
              </label>
              <Input id="city" name="city" className="w-full rounded-md" />
            </div>

            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-1 text-gray-400 text-lg"
              >
                Phone Number<span className="text-red-400">*</span>
              </label>
              <Input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="w-full rounded-md"
              />            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-gray-400 text-lg"
              >
                Email Address<span className="text-red-400">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                className="w-full rounded-md"
              />
            </div>

            <div className="flex items-center gap-4">
              <input
                required
                type="checkbox"
                className="text-red-500 active:bg-red-600"
              />
              <p className="text-lg tracking-wide">
                Save this information for faster check-out next time
              </p>
            </div>
          </nav>
        )}

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
                      ${item.subTotal}
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

          <div className={`flex gap-4 justify-between mb-8 items-center ${clientSecret ? "hidden" : ""}`}>
            <div className="flex items-center gap-3">
              <input type="radio" defaultChecked className="size-5 " />
              <span className="text-xl text-start font-semibold">Card</span>
            </div>
            <img className="w-16 self-end" src="/visa-master.png" alt="card" />
          </div>

          <ApplyCoupon className={`${clientSecret ? "hidden" : ""} my-6`} />

          <Button type="submit" className={`${clientSecret ? "hidden" : ""}`}>
            Place Order
          </Button>
        </nav>
      </form>
    </div>
  );
};

export default Checkout;
