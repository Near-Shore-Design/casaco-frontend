import InputField from "components/atoms/InputField";
import Select from "react-select";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/atoms/Button";
import SelectDropdown from "../SelectDropDown";
import { debounce } from "lodash";
import { propertyFormSchema } from "utilities/Schema/propertyListingSchema";
import MapWithDraggableMarker from "../MapWithDraggableMarker";
import ErrorMessage from "components/atoms/ErrorMessage";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { getPropertiesCoordinate } from "utilities/reduxSlices/MapSlice";
import { useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import { RootState } from "store";
import {
  getAllHomeProperties,
  propertyListing,
  updateIndex,
} from "utilities/reduxSlices/HomePropertySlice";
import { accommodationType } from "utilities/data/accomodation";
import { bathsFilter, bedsFilter } from "utilities/data/bedBath";
import PlaceComponent from "../GoogleCityComponent";
import { FaExchangeAlt } from "react-icons/fa";
import { PacmanLoader } from "react-spinners";
import { ExcemptEInput } from "utilities/helper-functions";

import axios from "axios";

type Inputs = {
  title: string;
  address: string;
  description: string;
  interior: number;
  department: string;
  exterior: number;
  apartment: string;
  addressTwo: number;
  feature: string;
};

interface listFormProp {
  onClose: () => void;
}

const PropertyListingForm: React.FC<listFormProp> = ({ onClose }) => {
  const [imageFile, setImageFile] = useState<string>("");
  const [imagePreview, setImageFilePreview] = useState<string>("");
  const [exteriorChange, setExteriorChange] = useState<boolean>(true);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [beds, setBeds] = useState<null>(null);
  const [exteriorValue, setExteriorValue] = useState<number>(0);
  const [errorState, setErrorState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [bathBathErrorState, setBathBathErrorState] = useState<boolean>(false);
  const [baths, setBaths] = useState<null>(null);
  const [bedsValue, setBedsValue] = useState<null>(null);
  const [imageValidation, setImageValidation] = useState<boolean>(false);
  const [bathsValue, setBathsValue] = useState<null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getCity, setGetCity] = useState<string>("");
  const { propertyCoordinate, propertyCoordinateError } = useAppSelector(
    (state: RootState) => state.map
  );

  const { userData } = useAppSelector((state: RootState) => state.auth);
  const formattedLat = propertyCoordinate?.lat?.toFixed(5);
  const formattedlng = propertyCoordinate?.lng?.toFixed(5);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    formState,
    setValue,
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(propertyFormSchema),
  });

  const dispatch = useAppDispatch();

  const cityCheck = getCity === "";

  const streetChecker = cityCheck;

  const handleExteriorChange = () => {
    setErrorState(false);
    let newValue;

    if (exteriorChange) {
      newValue = exteriorValue / 10000;
      setExteriorValue(newValue);
    } else {
      newValue = exteriorValue * 10000;
      setExteriorValue(newValue);
    }
    setExteriorChange((prev) => !prev);
  };

  const handleBedChange = (selected: any) => {
    setBathBathErrorState(false);
    setBedsValue(selected);
    setBeds(selected.value);
  };
  const handleBathChange = (selected: any) => {
    setBathBathErrorState(false);
    setBathsValue(selected);
    setBaths(selected.value);
  };

  const getSearchDebounce = debounce((input) => {
    const encodedAddress = encodeURIComponent(` ${input} ${getCity}`);
    setValue("address", input);
    if (input) {
      dispatch(getPropertiesCoordinate(encodedAddress));
    } else {
      return;
    }
  }, 700);

  const exteriorInputChange = (e: any) => {
    setErrorState(false);
    const value = e.target.value;
    setExteriorValue(value);

    if (exteriorChange && value < 1) {
      setErrorState(true);
      setErrorMessage("Minimum value should be 1");
    }
    if (!exteriorChange && value < 0.0001) {
      setErrorState(true);
      setErrorMessage("Minimum value should be 0.0001");
    }
    if (exteriorChange && value > 100000) {
      setErrorState(true);
      setErrorMessage("Maximum value is 100,000");
    }
    if (!exteriorChange && value > 10) {
      setErrorState(true);
      setErrorMessage("Maximum value is 10");
    }
    if (!exteriorChange && !value) {
      setErrorState(true);
      setErrorMessage("Add a value");
    }
  };

  const handleFileChange = (e: any) => {
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    e.preventDefault();
    const file = e.target.files[0];
    const fileSizeInBytes = file.size;
    if (file) {
      if (fileSizeInBytes > maxSizeInBytes) {
        if (imageRef.current) {
          imageRef.current.value = "";
        }
        setSizeError(true);
      } else {
        setSizeError(false);
        setImageFile(file);
        const newImagePreview = URL.createObjectURL(e.target.files[0]);
        setImageFilePreview(newImagePreview);
      }
    }
  };
  const imageRef = useRef<HTMLInputElement | null>(null);

  const removeImagePreview = () => {
    setImageFile("");
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };

  // const onSubmit = (data: Inputs) => {
  //   if (exteriorChange && exteriorValue > 2000) {
  //     setErrorState(true);
  //     setErrorMessage("Maximum value is 2,000");
  //     return;
  //   }
  //   if (bedsValue === null || bathsValue === null) {
  //     setBathBathErrorState(true);
  //     setErrorMessage("Bed and bath cannot be empty");
  //     return;
  //   }

  //   if (imageFile !== "") {
  //     setIsLoading(true);
  //     const formData = new FormData();

  //     // formData.append("user_id", String(userData.user_id));
  //     formData.append("title", data.address);
  //     formData.append("description", String(data.description));
  //     formData.append("beds", String(beds));
  //     formData.append("baths", String(baths));
  //     formData.append("types", data.apartment);
  //     formData.append("property_status", "idle");
  //     formData.append("price", String(20000));
  //     formData.append("location", getCity);
  //     formData.append("feature", "None");
  //     formData.append("latitude", String(formattedLat));
  //     formData.append("longitude", String(formattedlng));
  //     formData.append("exterior_size", String(exteriorValue));
  //     formData.append("interior_size", String(data.interior));
  //     // @ts-ignore
  //     formData.append("image1", imageFile, "property_image.jpg");

  //     dispatch(propertyListing(formData))
  //       .then(() => {
  //         dispatch(updateIndex(0));
  //         dispatch(getAllHomeProperties(userData.user_id));
  //         setIsLoading(false);
  //         onClose();
  //       })
  //       .catch((error) => {
  //         console.error(
  //           "Error:",
  //           error.response ? error.response.data : error.message
  //         );
  //       });
  //   } else {
  //     setImageValidation(true);
  //   }
  // };

  const apiUrl = "https://casaco.com.co/properties/";
  // const bearerToken =
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg5NjA4MzMzLCJpYXQiOjE2ODk2MDc0MzMsImp0aSI6ImFlYzhkYzZjMjVkYzRiOWNhZjFkZThlN2Q4MThmNTBiIiwidXNlcl9pZCI6Njd9.nXj5Qds_NHVk2ijvswvxKwx1Yyyu44qKDKMjQY2Q_88";

  const onSubmit = (data: Inputs) => {
    console.log(data, "datata");
    if (exteriorChange && exteriorValue > 2000) {
      setErrorState(true);
      setErrorMessage("Maximum value is 2,000");
      return;
    }
    if (bedsValue === null || bathsValue === null) {
      setBathBathErrorState(true);
      setErrorMessage("Bed and bath cannot be empty");
      return;
    }

    if (imageFile !== "") {
      setIsLoading(true);
      const formData = new FormData();

      // formData.append("user_id", String(userData.user_id));
      formData.append("title", data.address);
      formData.append("description", String(data.description));
      formData.append("beds", String(beds));
      formData.append("baths", String(baths));
      formData.append("types", data.apartment);
      formData.append("property_status", "idle");
      formData.append("price", String(20000));
      formData.append("location", getCity);
      formData.append("feature", "None");
      formData.append("latitude", String(formattedLat));
      formData.append("longitude", String(formattedlng));
      formData.append("exterior_size", String(exteriorValue));
      formData.append("interior_size", String(data.interior));
      // @ts-ignore
      formData.append("image1", imageFile, "property_image.jpg");
      // axios
      //   .post(apiUrl, formData, {
      //     headers: {
      //       Authorization: `Bearer ${access}`,

      //       // Authorization: `Bearer ${bearerToken}`,
      //       "Content-Type": "application/json", // Set the content type of the request body
      //     },
      //   })
      //   .then((response) => {
      //     // Handle successful response
      //     console.log("Response:", response.data);
      //   })
      //   .catch((error) => {
      //     // Handle error
      //     console.error(
      //       "Error:",
      //       error.response ? error.response.data : error.message
      //     );
      //   });
      dispatch(propertyListing(formData))
        .then(() => {
          dispatch(updateIndex(0));
          dispatch(getAllHomeProperties(userData.user_id));
          setIsLoading(false);
          onClose();
        })
        .catch((error) => {
          console.error(
            "Error:",
            error.response ? error.response.data : error.message
          );
        });
    }
  };

  const onPlaceSelected = (place: any) => {
    const cityValue = place.formatted_address;
    setGetCity(cityValue);
  };

  return (
    <div className="overflow-auto h-full max-h-[490px] max-w-[400px]">
      <form onSubmit={handleSubmit(onSubmit)} className="px-3 pb-5">
        <div className="mt-5">
          <label className="font-semibold text-sm text-gray-600 pb-1 block">
            Location
          </label>
          <PlaceComponent
            placeholder="Enter city..."
            defaultValue=""
            placeSelected={onPlaceSelected}
          />
        </div>

        <div className="">
          <label className="block mb-1.5 mt-3 ml-2 text-sm font-semibold text-gray-600 ">
            Address
          </label>
          <input
            type="text"
            {...register("address")}
            disabled={streetChecker}
            onChange={(e) => getSearchDebounce(e.target.value)}
            className="border rounded-lg text-lg dark:text-dark outline-none focus:border-violet-blue duration-200 px-3 py-2 mt-1 w-full"
          />
          {propertyCoordinateError ? (
            <ErrorMessage field="Enter a valid location" />
          ) : (
            <ErrorMessage field={errors.address?.message} />
          )}
        </div>

        <InputField
          label="Address Line 2"
          name="addressTwo"
          id="addressTwo"
          placeholder="Optional"
          type="string"
          register={register}
          error={errors.addressTwo?.message}
        />
        <div>
          <label className="block mb-1.5 mt-3 text-sm font-semibold text-gray-600 ">
            Property Details
          </label>
          <textarea
            {...register("description")}
            id="description"
            name="description"
            className="block p-2.5 w-full h-32 text-lg text-gray-900 bg-gray-50 rounded-lg border outline-none focus:ring-violet-blue duration-200 focus:border-violet-blue resize-none"
            placeholder="Give description about property..."
          ></textarea>
          <ErrorMessage field={errors.description?.message} />
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

        <div className=" flex gap-2">
          <InputField
            label={
              <span>
                {" "}
                Interior size m<sup>2</sup>
              </span>
            }
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
            render={({ field: { onChange, value } }) => (
              <SelectDropdown
                placeholder={"Apartment"}
                options={accommodationType}
                value={accommodationType.find((c) => c.value === value)}
                onChange={(val: any) => onChange(val.value)}
              />
            )}
          />
        </div>
        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <input
              type="file"
              id="file"
              ref={imageRef}
              accept="image/*"
              multiple
              className="py-3 "
              onChange={handleFileChange}
            />
            {imageValidation && <ErrorMessage field="Add a property image" />}
            {sizeError && <ErrorMessage field="Select file up to 5MB" />}
          </div>
          {imageFile && (
            <MdCancel
              className="cursor-pointer hover:rotate-180 duration-500"
              size={18}
              onClick={removeImagePreview}
            />
          )}
        </div>
        {imageFile && (
          <img src={imagePreview} alt="property-picture" className="py-4" />
        )}

        <MapWithDraggableMarker />
        <Button
          text={
            isLoading ? (
              <PacmanLoader color="#fff" size={5} />
            ) : (
              "Add to listing"
            )
          }
          type="submit"
          className="w-full flex justify-center"
          disabled={!formState.isValid || isLoading}
        />
      </form>
    </div>
  );
};

export default PropertyListingForm;
