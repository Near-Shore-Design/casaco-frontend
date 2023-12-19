import Button from "components/atoms/Button";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import { useState } from "react";
import { RootState } from "store";
import { findHighestAndLowest } from "utilities/helper-functions";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { filteredProperties } from "utilities/reduxSlices/HomePropertySlice";

interface propertySizeProp {
  onClick: () => void;
}
const PropertySize: React.FC<propertySizeProp> = ({ onClick }) => {
  const { buyProperties } = useAppSelector((state: RootState) => state.home);
  const interiorRange = findHighestAndLowest(buyProperties, "interior_size");
  const exteriorRange = findHighestAndLowest(buyProperties, "exterior_size");
  const dispath = useAppDispatch();
  const [minValueInterior, set_minValueInterior] = useState<any>(11);
  const [maxValueInterior, set_maxValueInterior] = useState<any>(
    interiorRange?.highest
  );
  const [minValueExterior, set_minValueExterior] = useState<any>(0);
  const [maxValueExterior, set_maxValueExterior] = useState<any>(
    exteriorRange?.highest
  );

  const filterPriceProperty = () => {
    onClick();
    dispath(
      filteredProperties({
        interior_size__gt: minValueInterior - 50,
        interior_size__lt: maxValueInterior + 50,
        exterior_size__gt: minValueExterior - 50,
        exterior_size__lt: maxValueExterior + 50,
      })
    );
  };
  const removeSlider =
    minValueInterior === undefined || maxValueInterior === undefined;

  return (
    <div className="w-full lg:w-[450px] max-w-[450px]">
      <h1 className="text-xl font-bold py-5">Interior size</h1>

      {!removeSlider && (
        <>
          <h2 className="text-2xl font-bold">
            {Math.ceil(minValueInterior)} m<sup>2</sup> -{" "}
            {Math.ceil(maxValueInterior)} m<sup>2</sup>
          </h2>
          <MultiRangeSlider
            style={{ boxShadow: "none", border: "none" }}
            ruler={false}
            min={11}
            max={interiorRange?.highest}
            step={1}
            barInnerColor="#D3AC2B"
            minValue={minValueInterior}
            maxValue={maxValueInterior}
            onInput={(e: ChangeResult) => {
              set_minValueInterior(e.minValue);
              set_maxValueInterior(e.maxValue);
            }}
          />
        </>
      )}

      <div className="mt-8">
        <h1 className="text-xl font-bold py-5">Exterior size</h1>
        <h2 className="text-2xl font-bold">
          {minValueExterior?.toLocaleString()} m<sup>2</sup> -{" "}
          {maxValueExterior?.toLocaleString()} m<sup>2</sup>{" "}
        </h2>
        <MultiRangeSlider
          style={{ boxShadow: "none", border: "none" }}
          ruler={false}
          min={0}
          max={exteriorRange?.highest}
          step={5}
          barInnerColor="#D3AC2B"
          minValue={minValueExterior}
          maxValue={maxValueExterior}
          onInput={(e: ChangeResult) => {
            set_minValueExterior(e.minValue);
            set_maxValueExterior(e.maxValue);
          }}
        />
      </div>
      <div className="flex justify-end border-t border-gray-400 mt-3 py-3">
        <div className="flex gap-3">
          <Button
            onClick={onClick}
            type="button"
            text="Cancel"
            className="bg-light-red"
          />
          <Button type="button" text="Apply" onClick={filterPriceProperty} />
        </div>
      </div>
    </div>
  );
};

export default PropertySize;
