import React from "react";
import { Facebook, Instagram, Linkedin, SendHorizontal, Twitter } from 'lucide-react';
const Footer = () => {

  //TODO: Check logged in
  const isLoggedIn = false;

  return (
    <footer className="bg-black py-4 px-4">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-10">
        <nav className="px-4 mx-auto">
          <h5 className="text-white font-bold text-xl mb-4">Exclusive</h5>
          <p className="text-white mb-4 font-semibold">Subscribe</p>
          <p className="mb-3 text-sm text-white">Get 10% off your first order</p>
          <div className="border flex rounded-md border-white py-2 px-4 w-fit">
            <input type="text" placeholder="Enter your email" className="placeholder:text-gray-300 text-sm outline-none text-white"/>
         <SendHorizontal className="text-white"/>
          </div>
        </nav>


        <nav className=" mx-auto">
          <h6 className="text-lg font-semibold mb-4 text-white">Support</h6>
          <p className="text-white mb-3.5 text-sm">Raozan, Chittagong, Bangladesh</p>
          <p className="text-white mb-3.5 text-sm">exclusive@gmail.com</p>
          <p className="text-white mb-3.5 text-sm">+880125345574</p>
        </nav>
     
     
     
      <nav className=" mx-auto">
          <h6 className="text-lg font-semibold mb-4 text-white">Account</h6>
          <p className="text-white mb-3.5 text-sm">My Account</p>
          {!isLoggedIn && <p className="text-white mb-3.5 text-sm">Login / Register</p>}
          <p className="text-white mb-3.5 text-sm">Cart</p>
          <p className="text-white mb-3.5 text-sm">Wishlist</p>
          <p className="text-white mb-3.5 text-sm">Shop</p>
        </nav>
     

 
      <nav className=" mx-auto">
          <h6 className="text-lg font-semibold mb-4 text-white">Quick Link</h6>
          <p className="text-white mb-3.5 text-sm">Privacy Policy</p>
          <p className="text-white mb-3.5 text-sm">Terms Of User</p>
          <p className="text-white mb-3.5 text-sm">FAQ</p>
          <p className="text-white mb-3.5 text-sm">Contact</p>
        </nav>
     

     <nav className=" mx-auto">
          <h6 className="text-lg font-semibold mb-4 text-white">Download App</h6>
          <p className="text-white mb-2 text-xs">Save 3$ with App New User Only</p>
          <div className="mb-2 flex gap-x-2">
            <img src="download-qr.png" alt="qr" className="size-20" />
            <div className="space-y-2">
    <img src="playstore.png" className="h-9.5 border border-white rounded-md"/>
    <img src="appstore.png" className="h-9 border border-white rounded-md"/>
            </div>
          </div>
         <div className="flex text-white gap-x-4">
          <Facebook className="size-4"/>
          <Twitter className="size-4"/>
          <Instagram className="size-4"/>
          <Linkedin className="size-4"/>
         </div>
        </nav>

     
      </div>

      <div className="border-b mb-4 border-gray-600/60"></div>
      <p className="text-gray-300 text-sm text-center">
        &copy;Copyright Pritom Chowdhury {new Date().getFullYear()}. All right
        reserved
      </p>
    </footer>
  );
};

export default Footer;
