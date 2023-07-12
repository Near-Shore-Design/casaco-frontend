import Button from "components/atoms/Button";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { useState } from "react";
import { RootState } from "store";
import { findHighestAndLowest } from "utilities/helper-functions";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import {
  filteredProperties,
  getAllProperties,
} from "utilities/reduxSlices/HomePropertySlice";

interface priceModalProp {
  onClick: () => void;
}
const Price: React.FC<priceModalProp> = ({ onClick }) => {
  const dispath = useAppDispatch();
  const { buyProperties } = useAppSelector((state: RootState) => state.home);
  const rangeValues = findHighestAndLowest(buyProperties, "price");
  const [minValue, set_minValue] = useState<any>(rangeValues?.lowest);
  const [maxValue, set_maxValue] = useState<any>(rangeValues?.highest);

  const filterPriceProperty = () => {
    onClick();
    dispath(
      filteredProperties({ price_gt: minValue - 100, price_lt: maxValue + 100 })
    );
  };
  const resetProperties = () => {
    onClick();
    dispath(getAllProperties());
  };

  const removeSlider = minValue === maxValue;

  const noProperty = minValue === undefined && maxValue === undefined;
  return (
    <div className="w-full lg:w-[450px] max-w-[550px]">
      <h1 className="text-xl font-bold mb-2 py-5">Price</h1>
      {!noProperty && (
        <h2 className="text-2xl font-bold">{`COP $${
          minValue ? minValue?.toLocaleString("es-CO") : ""
        } - COP $${maxValue ? maxValue?.toLocaleString("es-CO") : ""}`}</h2>
      )}
      {!removeSlider && (
        <MultiRangeSlider
          style={{ boxShadow: "none", border: "none" }}
          ruler={false}
          min={rangeValues?.lowest}
          max={rangeValues?.highest}
          step={5}
          barInnerColor="#D3AC2B"
          minValue={rangeValues?.lowest}
          maxValue={rangeValues?.highest}
          onInput={(e: ChangeResult) => {
            set_minValue(e.minValue);
            set_maxValue(e.maxValue);
          }}
        />
      )}
      {removeSlider && (
        <p className="mt-2">
          {noProperty
            ? " There is no prerty value to filter from"
            : "Sorry, we can't filter same range values"}
        </p>
      )}

      <div className="flex justify-end border-t border-gray-400 mt-3 py-3">
        <div className="flex gap-3">
          <Button
            onClick={onClick}
            type="button"
            text="Cancel"
            className="bg-light-red"
          />
          {!removeSlider && (
            <Button type="button" text="Apply" onClick={filterPriceProperty} />
          )}
          {removeSlider && (
            <Button type="button" text="Reset" onClick={resetProperties} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Price;
