import React from "react";

const InputBox = ({ placeholder, className, type, name, onChange, onBlur }) => {
  return (
    <input
      placeholder={placeholder}
      className={`${className} mb-6`}
      type={type}
      name={name}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default InputBox;
