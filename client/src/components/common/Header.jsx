import React from "react";
import Navbar from "./Navbar";
import Topbar from "./Topbar";

const Header = () => {
  return (
    <header className="border-b border-gray-300">
      <Topbar />
      <Navbar />
    </header>
  );
};

export default Header;
