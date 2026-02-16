import React, { useState } from "react";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authslice";

const Login = () => {

  const { loading} = useSelector(state => state.auth)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch()


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    
    const formData = new FormData(e.target);

    dispatch(loginUser({email: formData.get('email'), password: formData.get('password')}))

    e.target.reset()
    setIsSubmitting(false)
  }


  if(loading){
    <div>Loading</div>
  }

  return (
    <div className="py-14 flex duration-300 px-4">
      <img
        src="signup-image.jpeg"
        className="sm:max-w-109 xl:max-w-175 hidden md:block"
      />
      <nav className="flex flex-col justify-center items-center grow px-4">
        <form onSubmit={handleSubmit}><div>
          <div>
            <h2 className="text-4xl mb-4">Log in to Exclusive</h2>
            <p className="mb-8">Enter your details below</p>
          </div>

          <div className="mb-7 w-sm">
            <input
              type="email"
              placeholder="Email or Phone Number"
              className="border-b border-gray-400 outline-none py-1 w-full"
              name="email"
            />
          </div>
          <div className="mb-7  w-sm">
            <input
              type="password"
              placeholder="Password"
              className="border-b border-gray-400 outline-none py-1 w-full"
              name="password"
            />
          </div>
        </div>

        <div className="flex justify-between items-center w-sm mb-8">
          <button 
          disabled={isSubmitting}
          type="submit"
          className="rounded cursor-pointer mt-2 px-8 mb-4 py-3 text-white bg-red-600">
            Log In
          </button>
          <NavLink
            to="/forget-password"
            className="text-red-600 grow text-center"
          >
            Forget Password?
          </NavLink>
        </div>

        <div className="flex gap-x-4">
          <p className="text-gray-600">Don't have an account?</p>{" "}
          <NavLink
            to="/signup"
            className="underline text-gray-600 duration-300"
          >
            Sign Up
          </NavLink>
        </div></form>
      </nav>
    </div>
  );
};

export default Login;
