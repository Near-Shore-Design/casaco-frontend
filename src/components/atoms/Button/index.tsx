import React from "react";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  light,
  text,
  disabled,
  className,
  pill,
  onClick,
  iconBack,
  iconFront,
  type,
}) => {
  const pillVariant =
    "rounded-3xl hover:bg-white/30 hover:text-dark bg-transparent border border-gray-400 ";
  const lightVariant = "bg-platinum text-violet-blue";
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${light ? lightVariant : ""} ${
        pill ? pillVariant : "rounded"
      } ${
        disabled ? "bg-gray-700 text-gray-400" : "bg-violet-blue text-white"
      }  flex items-center gap-2 text-sm py-2  px-6 rounded hover:scale-95 duration-200 font-medium ${className}`}
    >
      {iconBack}
      {text}
      {iconFront}
    </button>
  );
};

export default Button;
