import React, { ReactNode } from "react";
import LeadIcon from "../assets/images/icons/lead-icon.svg";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 bg-primary px-4 py-3 rounded-full text-white hover:bg-purple-dark transition-all ease-linear justify-center ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
