import Button from "components/atoms/Button";
import { useState } from "react";
import { featuresList } from "utilities/data/feature";
import { useAppDispatch } from "utilities/hooks";
import { filteredProperties } from "utilities/reduxSlices/HomePropertySlice";

interface moreFilterProp {
  onClick: () => void;
}
const MoreFilter: React.FC<moreFilterProp> = ({ onClick }) => {
  const dispath = useAppDispatch();
  const [features, setFeatures] = useState<string[]>([]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    const isCheckedValue = e.target.value;
    if (isChecked) {
      setFeatures([...features, isCheckedValue]);
    } else {
      const newFeatures = features.filter((check) => check !== isCheckedValue);
      setFeatures(newFeatures);
    }
  };
  const param = `${features.join(",")}`;

  const filterFeaturesProperty = () => {
    onClick();
    dispath(filteredProperties({ feature__contains: param }));
  };

  const disableButton = features.length === 0;
  return (
    <div>
      <h1 className="text-xl py-3">Filter by some more features</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 flex-wrap gap-4">
        {featuresList?.map(({ text, value }, idx) => (
          <label
            key={idx}
            className="inline-flex items-center mt-2 cursor-pointer"
          >
            <input
              type="checkbox"
              value={value}
              className="form-checkbox rounded h-5 w-5 text-gray-600"
              onChange={handleChange}
            />
            <span className="ml-2 text-sm md:text-xl text-gray-700">
              {text}
            </span>
          </label>
        ))}
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
            onClick={filterFeaturesProperty}
          />
        </div>
      </div>
    </div>
  );
};

export default MoreFilter;
