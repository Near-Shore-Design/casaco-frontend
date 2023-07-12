import { useState } from "react";
import Button from "components/atoms/Button";
import { useAppDispatch } from "utilities/hooks";
import Select from "react-select";
import { filteredProperties } from "utilities/reduxSlices/HomePropertySlice";
import { bathsFilter, bedsFilter } from "utilities/data/bedBath";

interface amenitiesModalProp {
  onClick: () => void;
}
const Amenities: React.FC<amenitiesModalProp> = ({ onClick }) => {
  const [beds, setBeds] = useState<null>(null);
  const [baths, setBaths] = useState<null>(null);

  const [bedsValue, setBedsValue] = useState<null>(null);
  const [bathsValue, setBathsValue] = useState<null>(null);
  const dispatch = useAppDispatch();

  const disableButton = beds === null && baths === null;

  const handleBedChange = (selected: any) => {
    setBedsValue(selected);
    setBeds(selected.value);
  };
  const handleBathChange = (selected: any) => {
    setBathsValue(selected);
    setBaths(selected.value);
  };

  const filterProperties = () => {
    onClick();
    dispatch(filteredProperties({ baths: baths, beds: beds }));
  };

  return (
    <>
      <div className="flex gap-3 max-w-[550px] w-full lg:w-[400px] pb-2 ">
        <div className="w-full">
          <p className="py-3 ">Number of beds</p>
          <Select
            placeholder="No. of beds"
            value={bedsValue}
            options={bedsFilter}
            onChange={handleBedChange}
          />
        </div>
        <div className="w-full">
          <p className="py-3 ">Number of baths</p>
          <Select
            placeholder="No. of beds"
            options={bathsFilter}
            value={bathsValue}
            onChange={handleBathChange}
          />
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
            onClick={filterProperties}
          />
        </div>
      </div>
    </>
  );
};

export default Amenities;
