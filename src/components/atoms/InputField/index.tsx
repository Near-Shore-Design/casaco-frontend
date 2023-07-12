import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import ErrorMessage from "../ErrorMessage";
import { InputProps } from "./types";
import { useState } from "react";
import { FaExchangeAlt } from "react-icons/fa";

const InputField: React.FC<InputProps> = ({
  label,
  name,
  type,
  styles,
  id,
  error,
  addedIconFunc,
  register,
  min,
  max,
  addedIcon,
  disabled,
  containerStyles,
  placeholder,
}) => {
  const [visibility, setVisibility] = useState<boolean>(false);
  const toggleVisibility = () => {
    setVisibility((prev) => !prev);
  };
  const numberKeyPress = (e: any) => {
    if (
      type === "number" &&
      (e.key === "e" ||
        e.key === "-" ||
        e.key === (parseFloat(e.target.value) || 0) <= 0)
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className={`${containerStyles} mt-5`}>
      <label className="font-semibold text-sm text-gray-600 pb-1 block">
        {label}
      </label>
      <div className="relative">
        <input
          type={type === "password" ? (visibility ? "text" : "password") : type}
          {...register(name)}
          name={name}
          id={id}
          min={min ? min : 1}
          max={max}
          disabled={disabled}
          onKeyDown={numberKeyPress}
          placeholder={placeholder}
          className={`${styles} border rounded-lg dark:text-dark outline-none focus:border-violet-blue duration-200 px-3 py-2 mt-1 text-base w-full`}
        />
        {type === "password" && (
          <div
            onClick={toggleVisibility}
            className="absolute bottom-[12px] right-[10px] cursor-pointer"
          >
            {visibility ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>
        )}
        {addedIcon && (
          <div
            onClick={addedIconFunc}
            className="absolute bottom-[12px] right-[10px] cursor-pointer"
          >
            <FaExchangeAlt />
          </div>
        )}
      </div>

      <ErrorMessage field={error} />
    </div>
  );
};

export default InputField;
