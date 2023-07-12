import ErrorMessage from "components/atoms/ErrorMessage";
import InputField from "components/atoms/InputField";
import SelectDropdown from "components/molecules/SelectDropDown";
import React from "react";
import { Controller, UseFormRegister } from "react-hook-form";
import { FaExchangeAlt } from "react-icons/fa";
import Select from "react-select";
import { accommodationType } from "utilities/data/accomodation";
import { bathsFilter, bedsFilter } from "utilities/data/bedBath";
import { sellFeaturesList } from "utilities/data/feature";
import { ExcemptEInput } from "utilities/helper-functions";

interface stepTwoProp {
  register: UseFormRegister<any>;
  errors: any;
  propertyCoordinateError: boolean;
  control: any;
  features: Array<any>;
  handleFeatures: (x: any) => void;
  bedsValue: null;
  handleBedChange: (a: any) => void;
  bathsValue: null;
  handleBathChange: (x: any) => void;
  bathBathErrorState: boolean;
  errorMessage: string;
  exteriorValue: number;
  exteriorInputChange: (x: any) => void;
  exteriorChange: boolean;
  errorState: boolean;
  handleExteriorChange: (x: any) => void;
}
const StepTwo: React.FC<stepTwoProp> = ({
  register,
  errors,
  control,
  features,
  handleFeatures,
  bedsValue,
  exteriorValue,
  handleBedChange,
  bathsValue,
  handleBathChange,
  errorMessage,
  exteriorInputChange,
  bathBathErrorState,
  exteriorChange,
  errorState,
  handleExteriorChange,
}) => {
  return (
    <div>
      <div className="flex flex-wrap lg:flex-nowrap gap-2 py-7">
        <InputField
          label="Price (COP)"
          name="price"
          id="price"
          type="number"
          register={register}
          containerStyles="w-full "
          error={errors.price?.message}
        />
        <div className="w-full">
          <label className="block mb-1.5 mt-5 text-sm font-semibold text-gray-600 ">
            Features
          </label>
          <Select
            placeholder="Features"
            value={features}
            options={sellFeaturesList}
            className="w-full"
            isMulti
            onChange={handleFeatures}
          />
        </div>
      </div>
      <div className="flex gap-2 my-3">
        <div className="w-full">
          <label className="block mb-1.5 mt-3 text-sm font-semibold text-gray-600 ">
            Beds
          </label>
          <Select
            placeholder="No. of beds"
            value={bedsValue}
            options={bedsFilter}
            className="w-full"
            onChange={handleBedChange}
          />
        </div>
        <div className="w-full">
          <label className="block mb-1.5 mt-3 text-sm font-semibold text-gray-600 ">
            Baths
          </label>
          <Select
            placeholder="No. of beds"
            options={bathsFilter}
            value={bathsValue}
            className="w-full"
            onChange={handleBathChange}
          />
        </div>
      </div>
      {bathBathErrorState && <ErrorMessage field={errorMessage} />}
      <div className="flex flex-wrap lg:flex-nowrap gap-2">
        <InputField
          label="Interior size (m^2)"
          name="interior"
          id="interior"
          min={10}
          type="number"
          containerStyles="w-full"
          register={register}
          error={errors.interior?.message}
        />

        <div className="w-full mt-1.5">
          <div className="relative ">
            <label className="block mb-1.5 mt-3 text-sm font-semibold text-gray-600 ">
              {`Exterior size ${exteriorChange ? "(m^2)" : "(hectáreas)"}`}
            </label>
            <input
              type="number"
              value={exteriorValue}
              onKeyDown={ExcemptEInput}
              name="exterior"
              id="exterior"
              className={`border rounded-lg dark:text-dark outline-none focus:border-violet-blue duration-200 px-3 py-2 mt-1 text-lg w-full`}
              onChange={exteriorInputChange}
            />

            <div
              onClick={handleExteriorChange}
              className="absolute bottom-[14px] right-[10px] cursor-pointer"
            >
              <FaExchangeAlt />
            </div>
          </div>
          {errorState && <ErrorMessage field={errorMessage} />}
        </div>
      </div>

      <div>
        <label className="block mb-1.5 mt-3 text-sm font-semibold text-gray-600 ">
          Apartment type
        </label>
        <Controller
          name="apartment"
          control={control}
          render={({ field: { onChange, value, name } }) => (
            <SelectDropdown
              placeholder={"Apartment type"}
              options={accommodationType}
              value={accommodationType.find((c) => c.value === value)}
              onChange={(val: any) => onChange(val.value)}
            />
          )}
        />
      </div>
    </div>
  );
};

export default StepTwo;
