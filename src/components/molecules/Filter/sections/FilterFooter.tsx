import Button from "components/atoms/Button";
import React from "react";

const FilterFooter = () => {
  return (
    <div className="absolute bottom-0 bg-black flex justify-end w-full">
      <Button text="Apply" type="button" />
    </div>
  );
};

export default FilterFooter;
