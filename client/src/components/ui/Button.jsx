import React from "react";

const Button = ({ children, onClick, className, type, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`rounded text-sm md:text-base cursor-pointer px-4 md:px-8 py-2 md:py-3 text-white bg-red-600/70 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
