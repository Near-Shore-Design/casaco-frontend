import ErrorMessage from "components/atoms/ErrorMessage";
import InputField from "components/atoms/InputField";
import PlaceComponent from "components/molecules/GoogleCityComponent";
import { UseFormRegister } from "react-hook-form";

interface stepOneProp {
  register: UseFormRegister<any>;
  errors: any;
  propertyCoordinateError: boolean;
  onPlaceSelected: (x: any) => void;
  control: any;
  getSearchDebounce: (x: string) => void;
  streetChecker: boolean;
  locationValue: string;
}
const StepOne: React.FC<stepOneProp> = ({
  register,
  propertyCoordinateError,
  onPlaceSelected,
  errors,
  getSearchDebounce,
  streetChecker,
  locationValue,
}) => {
  return (
    <div>
      <div className="w-full mt-5">
        <label className="font-semibold text-sm text-gray-600 pb-1 block">
          Location
        </label>
        <PlaceComponent
          placeholder="Enter property location..."
          defaultValue={locationValue}
          placeSelected={onPlaceSelected}
        />
      </div>
      <div className="">
        <label className="block mb-1.5 mt-3 ml-2 text-sm font-semibold text-gray-600 ">
          Street name
        </label>
        <input
          type="text"
          {...register("address")}
          disabled={streetChecker}
          onChange={(e) => getSearchDebounce(e.target.value)}
          className="border rounded-lg dark:text-dark outline-none focus:border-violet-blue duration-200 px-3 py-2 mt-1 text-lg w-full"
          required
        />
        {propertyCoordinateError ? (
          <ErrorMessage field="Enter a valid location" />
        ) : (
          <ErrorMessage field={errors.location?.message} />
        )}
      </div>

      <div>
        <label className="block mb-1.5 mt-3 text-sm font-semibold text-gray-600 ">
          Property Details
        </label>
        <textarea
          {...register("description")}
          id="description"
          name="description"
          className="block p-2.5 w-full h-32 text-sm text-gray-900 bg-gray-50 rounded-lg border outline-none focus:ring-violet-blue duration-200 focus:border-violet-blue resize-none"
          placeholder="Give description about property..."
        ></textarea>
        <ErrorMessage field={errors.description?.message} />
      </div>
    </div>
  );
};

export default StepOne;
