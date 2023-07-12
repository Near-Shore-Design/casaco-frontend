import { useLoadScript } from "@react-google-maps/api";
import React from "react";
import Autocomplete from "react-google-autocomplete";

// Move the libraries array outside of the component
const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

interface placeComponentProp {
  placeSelected: (x: any) => void;
  defaultValue: string;
  className?: string;
  placeholder: string;
}

const PlaceComponent: React.FC<placeComponentProp> = ({
  placeSelected,
  defaultValue,
  className,
  placeholder,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: libraries, // Use the libraries array here
  });

  const autocompleteOptions: any = {
    types: ["geocode"],
    componentRestrictions: { country: "co" },
  };

  return (
    <>
      {isLoaded && (
        <Autocomplete
          apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
          defaultValue={defaultValue}
          onPlaceSelected={placeSelected}
          options={autocompleteOptions}
          placeholder={placeholder}
          className={`${className} border rounded-lg dark:text-dark outline-none focus:border-violet-blue duration-200 px-3 py-2 mt-1 text-sm w-full h-12`}
        />
      )}
    </>
  );
};

export default PlaceComponent;
