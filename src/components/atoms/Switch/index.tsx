import React from "react";
import { SwitchProp } from "./type";

const Switch: React.FC<SwitchProp> = ({ onClick, text }) => {
  return (
    <>
      <div className="relative inline-block w-10 mr-2 align-middle select-none ease-in">
        <input
          type="checkbox"
          name="toggle"
          id="toggle"
          onClick={onClick}
          className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        />
        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-violet-blue cursor-pointer"></label>
      </div>
      <label className="text-base font-semibold text-white dark:text-white">
        {text}
      </label>
    </>
  );
};

export default Switch;
