import Button from "components/atoms/Button";
import { useState } from "react";
import { accommodationType } from "utilities/data/accomodation";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import {
  addToHomeType,
  removeFromHomeType,
} from "utilities/reduxSlices/buyPropertySlice";
import { filteredProperties } from "utilities/reduxSlices/HomePropertySlice";

interface acommodationTypeProp {
  onClick: () => void;
}
const AccomodationType: React.FC<acommodationTypeProp> = ({ onClick }) => {
  const dispatch = useAppDispatch();

  const { homeType } = useAppSelector((state) => state.buy);

  const [expand, setExpand] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const isCheckedValue = e.target.value;
    if (isChecked) {
      dispatch(addToHomeType(isCheckedValue));
    } else {
      dispatch(removeFromHomeType(isCheckedValue));
    }
  };

  const filteredHomeType = homeType?.filter((_, index) => index !== 0);

  const param = `${filteredHomeType?.join(",")}`;

  const filterHomeTypeProperty = () => {
    onClick();
    dispatch(filteredProperties({ types__in: param }));
  };

  const itemsToShow = expand
    ? accommodationType
    : accommodationType.slice(0, 9);

  const disableButton = homeType?.length === 0;

  return (
    <>
      <div className="pb-5 mt-4 w-full lg:w-[450px]">
        <h1 className="text-xl font-bold mb-2 py-5">Amenities</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 flex-wrap gap-4">
          {itemsToShow?.map(({ label }, idx) => (
            <label
              key={idx}
              className="inline-flex items-center mt-2 cursor-pointer w-fit"
            >
              <input
                type="checkbox"
                value={label}
                className="form-checkbox rounded h-5 w-5 text-gray-600"
                checked={homeType?.includes(label) ? true : false}
                onChange={handleChange}
              />
              <span className="ml-2 text-sm md:text-xl text-gray-700">
                {label}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex justify-end border-t border-gray-400 mt-3 py-3">
        <div className="flex gap-3">
          <Button
            onClick={onClick}
            type="button"
            text="Cancel"
            className="bg-light-red"
          />
          <Button
            type="button"
            text="Apply"
            disabled={disableButton}
            onClick={filterHomeTypeProperty}
          />
        </div>
      </div>
    </>
  );
};

export default AccomodationType;
