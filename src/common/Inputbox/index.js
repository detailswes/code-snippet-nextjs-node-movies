import React from 'react';

const InputBox = ({ placeholder, className, type, name }) => {
  return (
    <input
      placeholder={placeholder}
      className={`${className} mb-6`}
      type={type}
      name={name}
    />
  );
};

export default InputBox;