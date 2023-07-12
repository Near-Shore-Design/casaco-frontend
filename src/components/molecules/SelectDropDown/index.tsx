import Select, { StylesConfig } from "react-select";
import { OptionType, selectProp } from "./types";

const SelectDropdown: React.FC<selectProp> = ({
  options,
  value,
  placeholder,
  onChange,
  isMulti,
}) => {
  const customStyles: StylesConfig<OptionType, false> = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "blue" : "white",

      // Add other styles for the options if needed
      ":hover": {
        backgroundColor: "lightgray",
        cursor: "pointer",
      },
    }),
  };
  return (
    <>
      <Select
        options={options}
        styles={customStyles}
        value={value}
        placeholder={placeholder}
        isMulti={isMulti}
        onChange={onChange}
      />
    </>
  );
};

export default SelectDropdown;
