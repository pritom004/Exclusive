import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { Search, User, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { User2, ShoppingBag, CircleX, Star, LogOut } from "lucide-react";
import { logoutUser } from "../../redux/slices/authSlice";
import { fetchCart } from "../../redux/slices/cartSlice";



  const options = [
    {
      id: 1,
      title: "Manage My Account",
      icon: User2,
      href: "/account",
    },
    {
      id: 2,
      title: "My Orders",
      icon: ShoppingBag,
      href: "/account",
    },
    {
      id: 3,
      title: "My Cancellations",
      icon: CircleX,
      href: "/account",
    },
    {
      id: 4,
      title: "My Reviews",
      icon: Star,
      href: "/account",
    },
  ];

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { user, guestId } = useSelector((state) => state.auth);
  const {cart} = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  useEffect(() => {
    let query = user ? { userId: user._id } : { guestId };
    dispatch(fetchCart(query))
  }, [])


  return (
    <div className="container gap-y-1 mx-auto p-4 flex flex-col lg:flex-row justify-between">
      <h1 className="text-2xl font-bold mx-auto">
        <NavLink to="/">Exclusive</NavLink>
      </h1>
      <ul className="md:flex gap-x-10 hidden mx-auto my-2">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive ? "underline" : "";
            }}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink 
          to="/contact"
          className={({ isActive }) => {
              return isActive ? "underline" : "";
            }}
          >Contact</NavLink>
        </li>
        <li>
          <NavLink
           className={({ isActive }) => {
              return isActive ? "underline" : "";
            }}
          to="/about">About</NavLink>
        </li>
        {!user && (
          <li>
            <NavLink
              to="/signup"
              className={({ isActive }) => {
                return isActive ? "underline" : "";
              }}
            >
              Sign Up
            </NavLink>
          </li>
        )}
      </ul>
      <div className="flex gap-x-8 mx-auto items-center">
        <div className="flex gap-x-2 rounded-md bg-gray-100 px-4 py-1.5">
          <input
            placeholder="What are you looking for?"
            type="text"
            className="outline-none placeholder:text-gray-500 placeholder:text-xs"
          />
          <Search />
        </div>
        <Link to="/cart" className="relative">
          {cart && cart.items?.length > 0 && (<span className="absolute -right-2.5 -top-2.5 text-center text-white bg-red-500 size-5 rounded-full text-sm" >{cart.items?.length}</span>)}
          <ShoppingCart />
        </Link>
        {user && (
          <div className="relative">
            <button className={`${isActive? "bg-red-600 p-0.5 text-white rounded-full" : ""} duration-300`} onClick={() => setIsActive(!isActive)}>
              <User />
              <nav className={`absolute z-50 duration-300 space-y-4 bg-black/47 text-white p-4 top-7.5 right-0 xl:-right-54 ${isActive? "": "hidden"}`}>
                {options.map((option) => (
                  <Link
                    className="flex justify-baseline gap-2 min-w-52"
                    key={option.id}
                    to={option.href}
                  >
                    <option.icon />
                    {option.title}
                  </Link>
                ))}

                 <span
                    className="flex justify-baseline gap-2 min-w-52"
                    onClick={handleLogout}
                  >
                    <LogOut />
                    Logout
                  </span>
              </nav>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
