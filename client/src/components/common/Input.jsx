import React from "react";

const Input = ({placeholder, className, type = "text", id, value, onChange}) => {
  return (
    <input
    id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`bg-gray-200/65 grow text-gray-600 outline-none px-2.5 py-2 ${className}`}
    />
  );
};

export default Input;
