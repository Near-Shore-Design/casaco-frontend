import { useState } from "react";
import AsyncSelect from "react-select/async";
import { RootState } from "store";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import {
  getCenterCoordinate,
  getMainPageSearchQuery,
  getMapCoordinate,
  getPolygonCoordinates,
  removePolygonCoordinates,
} from "utilities/reduxSlices/MapSlice";

interface multiSelectProp {
  menuPortalTargetRef: React.RefObject<HTMLDivElement>;
  width?: number;
}

const MultiSelectAutoComplete: React.FC<multiSelectProp> = ({ width }) => {
  const { mainPageSearch } = useAppSelector((state: RootState) => state.map);
  const isEmpty = mainPageSearch.value === "";
  const [selectedOptions, setSelectedOptions] = useState(
    isEmpty ? [] : [mainPageSearch]
  );

  const dispatch = useAppDispatch();

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      width: width || "300px",
      border: "none",
      boxShadow: "none",
      "&:hover": {
        border: "none",
        boxShadow: "none",
      },
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      display: "none",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const loadOptions = (inputValue: any, callback: any) => {
    if (!inputValue) {
      callback([]);
      return;
    }

    const service = new window.google.maps.places.AutocompleteService();

    service.getPlacePredictions(
      { input: inputValue, componentRestrictions: { country: "CO" } },
      (predictions, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const options = predictions
            ? predictions.map((prediction) => ({
                value: prediction.place_id,
                label: prediction.description,
              }))
            : [];
          callback(options);
        } else {
          callback([]);
        }
      }
    );
  };

  const handleSelectChange = (selected: any) => {
    const value = selected[selected.length - 1]?.label;
    const removedOption = selectedOptions.find(
      (option: any) => !selected.includes(option)
    );

    if (removedOption) {
      dispatch(getMainPageSearchQuery(""));
      dispatch(removePolygonCoordinates());
      dispatch(getMapCoordinate(value)).then((data) => {
        if (data) {
          dispatch(removePolygonCoordinates());
        }
      });
    }

    if (value) {
      dispatch(getMapCoordinate(value)).then((data: any) => {
        if (data) {
          const searchQuery = data.meta.arg;
          const firstWord = searchQuery.split(",").shift();

          dispatch(getPolygonCoordinates(firstWord));
          dispatch(getCenterCoordinate(data.payload.location));
        }
      });
    }

    setSelectedOptions(selected);
  };

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      styles={customStyles}
      defaultOptions
      loadOptions={loadOptions}
      onChange={handleSelectChange}
      value={selectedOptions}
    />
  );
};

export default MultiSelectAutoComplete;
