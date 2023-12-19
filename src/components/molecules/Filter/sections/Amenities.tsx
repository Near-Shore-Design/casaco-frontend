import Button from "components/atoms/Button";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import {
  updateBedsFilter,
  updateBathsFilter,
  updateNoOfBedsSelectedDrpdwnObj,
  updateNoOfBathsSelectedDrpdwnObj,
} from "utilities/reduxSlices/buyPropertySlice";
import Select from "react-select";
import { filteredProperties } from "utilities/reduxSlices/HomePropertySlice";
import { bathsFilter, bedsFilter } from "utilities/data/bedBath";

interface amenitiesModalProp {
  onClick: () => void;
}
const Amenities: React.FC<amenitiesModalProp> = ({ onClick }) => {
  const {
    noOfBedsSelected,
    noOfBathsSelected,
    noOfBedsSelectedDrpdwnObj,
    noOfBathsSelectedDrpdwnObj,
  } = useAppSelector((state) => state.buy);

  const dispatch = useAppDispatch();

  const disableButton = noOfBedsSelected === null && noOfBathsSelected === null;

  const handleBedChange = (selected: any) => {
    dispatch(updateNoOfBedsSelectedDrpdwnObj(selected));
    dispatch(updateBedsFilter(selected?.value));
  };
  const handleBathChange = (selected: any) => {
    dispatch(updateNoOfBathsSelectedDrpdwnObj(selected));
    dispatch(updateBathsFilter(selected?.value));
  };

  const filterProperties = () => {
    onClick();
    dispatch(
      filteredProperties({ baths: noOfBathsSelected, beds: noOfBedsSelected })
    );
  };

  return (
    <>
      <div className="flex gap-3 max-w-[550px] w-full lg:w-[400px] pb-2 ">
        <div className="w-full">
          <p className="py-3 ">Number of beds</p>
          <Select
            placeholder="No. of beds"
            value={noOfBedsSelectedDrpdwnObj}
            options={bedsFilter}
            onChange={handleBedChange}
          />
        </div>
        <div className="w-full">
          <p className="py-3 ">Number of baths</p>
          <Select
            placeholder="No. of beds"
            options={bathsFilter}
            value={noOfBathsSelectedDrpdwnObj}
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
