import React, { useState } from "react";
import { NavLink } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const Signup = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { registerUserUtil } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);

    await registerUserUtil({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      })
    e.target.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="py-14 flex duration-300 px-4">
      {!isImageLoaded && (
        <div className="sm:max-w-109 md:block xl:max-w-175 hidden w-full">
          <Skeleton count={1}  className="h-90 lg:h-175"/>
        </div>
      )}
      <img
        src="signup-image.jpeg"
        className="sm:max-w-109 xl:max-w-175 hidden md:block"
        onLoad={() => setIsImageLoaded(true)}
      />
      <nav className="flex flex-col justify-center items-center grow px-4">
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <h2 className="text-4xl mb-4">Create an account</h2>
              <p className="mb-8">Enter your details below</p>
            </div>

            <div className="mb-7 w-sm">
              <input
                type="text"
                placeholder="Name"
                name="name"
                required
                minLength={3}
                className="border-b border-gray-400 outline-none py-1 w-full"
              />
            </div>
            <div className="mb-7 w-sm">
              <input
                type="email"
                placeholder="Email or Phone Number"
                required
                name="email"
                minLength={8}
                className="border-b border-gray-400 outline-none py-1 w-full"
              />
            </div>
            <div className="mb-7  w-sm">
              <input
                type="password"
                placeholder="Password"
                minLength={6}
                name="password"
                required
                className="border-b border-gray-400 outline-none py-1 w-full"
              />
            </div>
          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="rounded cursor-pointer mt-2 px-8 mb-4 py-3 text-white bg-red-600 w-sm"
          >
            Create Account
          </button>
        </form>
         <a href={`${import.meta.env.VITE_BACKEND_URL}/auth/google`}>
        <button className="rounded border flex gap-1.5 items-center justify-center py-3 cursor-pointer bg-white w-sm mb-8">
          <FcGoogle className="size-6.5" />
         
            Sign up with Google
         
        </button>
         </a>

        <div className="flex gap-x-4">
          <p className="text-gray-600">Already have an account?</p>{" "}
          <NavLink to="/login" className="underline text-gray-600 duration-300">
            Log in
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Signup;
