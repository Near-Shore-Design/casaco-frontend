import InputField from "components/atoms/InputField";
import Select from "react-select";
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/atoms/Button";
import SelectDropdown from "../SelectDropDown";
import { debounce } from "lodash";
import MapWithDraggableMarker from "../MapWithDraggableMarker";
import ErrorMessage from "components/atoms/ErrorMessage";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { getPropertiesCoordinate } from "utilities/reduxSlices/MapSlice";
import { useState, useEffect, useRef } from "react";
import { MdCancel } from "react-icons/md";
import { RootState } from "store";
import {
  getAllHomeProperties,
  updateListing,
} from "utilities/reduxSlices/HomePropertySlice";
import { accommodationType } from "utilities/data/accomodation";
import { bathsFilter, bedsFilter } from "utilities/data/bedBath";
import PlaceComponent from "../GoogleCityComponent";
import { FaExchangeAlt } from "react-icons/fa";
import { PacmanLoader } from "react-spinners";
import { findIndexByKeyValuePair } from "utilities/helper-functions";
import { sellFeaturesList } from "utilities/data/feature";
import { listingUpdateFormSchema } from "utilities/Schema/updateListedProperty";
import StatefulInputField from "components/atoms/InputField/StatefulInputField";
import { ExcemptEInput } from "utilities/helper-functions";
import {
  updateRemovedImageBlob,
  updateRemovedImageIndex,
} from "utilities/reduxSlices/sellPropertySlice";

type Inputs = {
  location: string;
  address: string;
  propertyDetails: string;
  price: number;
  features: any[];
  beds: number;
  baths: number;
  interiorSize: number;
  exteriorSize: number;
  apartmentType: string;
  propertyImages: string[];
};

interface listFormProp {
  onClose: () => void;
}

const UpdatePropertyListingForm: React.FC<listFormProp> = ({ onClose }) => {
  const { singleProperty } = useAppSelector((state: RootState) => state.home);
  const { removedImageBlob, removedImageIndex } = useAppSelector(
    (state: RootState) => state.sell
  );

  const {
    title,
    beds,
    baths,
    description,
    exterior_size,
    location,
    feature,
    interior_size,
    property_id,
    images,
    types,
  } = singleProperty;

  const convertIntoFeaturesSelectionArrFormat = () => {
    const convertedFeaturesInitialArray = feature[0]
      ?.split(",")
      .map((item) => item?.trim());
    return convertedFeaturesInitialArray?.map((feature: any) => {
      const label = feature?.replace(/_/g, " ");
      const value = feature;
      return { label, value };
    });
  };

  const defaultFeatures = convertIntoFeaturesSelectionArrFormat();

  const bedIndex = findIndexByKeyValuePair(bedsFilter, "value", beds);
  const bathIndex = findIndexByKeyValuePair(bedsFilter, "value", baths);

  const formatPropertySize = (value: number) => {
    // Convert the number to a string
    let stringValue = value.toString();
    // Remove trailing zeros and the decimal point if they exist
    stringValue = stringValue.includes(".")
      ? stringValue.replace(/\.?0+$/, "")
      : stringValue;
    // Convert the string back to a number
    return parseFloat(stringValue);
  };

  const formattedInteriorSize = formatPropertySize(interior_size);
  const formattedExteriorSize = formatPropertySize(exterior_size);

  const [currentImages, setCurrentImages] = useState<string[]>(images);
  const [imageFile, setImageFile] = useState<any[]>([]);
  const [imagePreview, setImageFilePreview] = useState<any[]>([]);
  const [exteriorChange, setExteriorChange] = useState<boolean>(true);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [bed, setBeds] = useState<any>(beds);
  const [exteriorValue, setExteriorValue] = useState<number>(
    formattedExteriorSize
  );
  const [errorState, setErrorState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [bathBathErrorState, setBathBathErrorState] = useState<boolean>(false);
  const [bath, setBaths] = useState<any>(baths);
  const [featuresValue, setFeaturesValue] = useState<any>([]);
  const [features, setFeatures] = useState<any>(defaultFeatures);
  const [bedsValue, setBedsValue] = useState<any>(bedsFilter[bedIndex]);
  const [bathsValue, setBathsValue] = useState<any>(bedsFilter[bathIndex]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getCity, setGetCity] = useState<string>(location);
  const [hasPriceBeenAdded, setHasPriceBeenAdded] = useState<boolean>(false);
  const [numericPrice, setNumericPrice] = useState<number>(0);
  const [price, setPrice] = useState("");
  const [imageValidation, setImageValidation] = useState<boolean>(false);

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
    getValues,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      location: location,
      address: title,
      propertyDetails: description,
      features: features,
      beds: beds,
      baths: baths,
      interiorSize: formattedInteriorSize,
      exteriorSize: formattedExteriorSize,
      apartmentType: types,
      propertyImages: images,
    },
    mode: "onChange",
    resolver: yupResolver(listingUpdateFormSchema),
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

  const handleFeatures = (selected: any) => {
    setFeatures(selected);
    const values = selected.map((option: any) => option.value);
    setFeaturesValue(values);
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
    const encodedAddress = encodeURIComponent(`${input} ${getCity} `);
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

    if (exteriorChange && value < 10) {
      setErrorState(true);
      setErrorMessage("Value must be more than 10");
    }
    if (exteriorChange && value > 2000) {
      setErrorState(true);
      setErrorMessage("Maximum value is 2,000");
    }
    if (!exteriorChange && value > 100000) {
      setErrorState(true);
      setErrorMessage("Maximum value is 100,000");
    }
    if (!exteriorChange && !value) {
      setErrorState(true);
      setErrorMessage("Add a value");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    const selectedFiles = Array.from(e.target.files || []); // Convert FileList to an array
    const validFiles: File[] = [];
    const invalidFiles: File[] = [];
    setImageValidation(false);
    setSizeError(false);

    selectedFiles.forEach((file) => {
      const fileSizeInBytes = file.size as number;
      if (fileSizeInBytes > maxSizeInBytes) {
        invalidFiles.push(file);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      if (imageRef.current) {
        imageRef.current.value = "";
      }
      setSizeError(true);
    } else {
      setSizeError(false);
      // @ts-ignore
      setImageFile((prevImageFiles: any) => [...prevImageFiles, ...validFiles]);

      const imagePreviews = validFiles.map((file) => URL.createObjectURL(file));
      // @ts-ignore
      setImageFilePreview((prevImagePreviews: any) => [
        ...prevImagePreviews,
        ...imagePreviews,
      ]);
    }
  };

  const imageRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (data: Inputs) => {
    const numericPrice = parseFloat(price.replace(/\./g, "").replace(",", "."));
    setIsLoading(true);
    const formData = new FormData();
    formData.append("user_id", String(userData.user_id));
    formData.append("title", data.address);
    formData.append("description", String(data.propertyDetails));
    formData.append("beds", String(bedsValue?.value));
    formData.append("property_status", "for_sale");
    formData.append("price", String(numericPrice));
    formData.append("location", getCity);
    formData.append("baths", String(bathsValue?.value));
    formData.append("types", data.apartmentType);
    formData.append("location", getCity);
    formData.append("feature", featuresValue.join(", "));
    formData.append("latitude", String(formattedLat));
    formData.append("longitude", String(formattedlng));
    formData.append("exterior_size", String(exteriorValue));
    formData.append("interior_size", String(data.interiorSize));
    (imageFile as File[]).forEach((image: File, index: number) => {
      formData.append(
        `image` + index,
        image,
        "property_sale_img" + index + ".png"
      );
    });
    dispatch(updateListing({ data: formData, id: property_id })).then(() => {
      dispatch(getAllHomeProperties(userData.user_id));
      setIsLoading(false);
      onClose();
    });
  };
  const onPlaceSelected = (place: any) => {
    const cityValue = place.formatted_address;
    setGetCity(cityValue);
    setValue("location", cityValue);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e?.target?.value;
    const numericValue = val.replace(/[^0-9]/g, "").replace(",", ".");
    const formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    const stringWithoutDots = formattedValue.replace(/\./g, "");
    const numberValue = parseFloat(stringWithoutDots);
    setPrice(formattedValue);
    setNumericPrice(numberValue);
    if (!hasPriceBeenAdded) {
      setHasPriceBeenAdded(true);
    }
  };

  const handleCurrentImagesChange = (imageUrl: string) => {
    const filteredCurrentImagesArray = currentImages?.filter(
      (currentImage) => currentImage !== imageUrl
    );
    setCurrentImages(filteredCurrentImagesArray);
  };

  const priceValidationMsg =
    hasPriceBeenAdded && (numericPrice < 1 || isNaN(numericPrice))
      ? "Minimum property amount should be 1 Colombian pesos"
      : numericPrice >= 50000000000 &&
        "Maximum property amount can be 50.000.000.000 Colombian pesos";

  const propertyValues = getValues();

  const watchValues = watch();

  const propertyLocation = propertyValues?.location;
  const propertyFeatures = propertyValues?.features;

  const isPropertyEmpty = (value: any) => {
    return value === undefined || value === null || value.length === 0;
  };

  const isAddForSaleBtnDisabled =
    isPropertyEmpty(propertyValues?.location) ||
    isPropertyEmpty(propertyValues?.address) ||
    isPropertyEmpty(propertyValues?.propertyDetails) ||
    isPropertyEmpty(price) ||
    isPropertyEmpty(propertyValues?.features) ||
    isPropertyEmpty(bedsValue) ||
    isPropertyEmpty(bathsValue) ||
    isPropertyEmpty(propertyValues?.interiorSize) ||
    isPropertyEmpty(propertyValues?.exteriorSize) ||
    isPropertyEmpty(propertyValues?.apartmentType) ||
    isPropertyEmpty(propertyValues?.propertyImages) ||
    parseInt(price) === 0;

  useEffect(() => {
    setImageFilePreview((prevState) =>
      prevState.filter((item) => item !== removedImageBlob)
    );
    setImageFile((prevState) =>
      prevState.filter((_, index: number) => index !== removedImageIndex)
    );
  }, [removedImageBlob]);

  useEffect(() => {
    const values = features?.map((option: any) => option?.value);
    setFeaturesValue(values);
  }, []);

  return (
    <div className="overflow-auto h-full max-h-[490px] max-w-[400px]">
      <form onSubmit={handleSubmit(onSubmit)} className="px-3 pb-5">
        <div className="mt-5">
          <label className="font-semibold text-sm text-gray-600 pb-1 block">
            Location
          </label>
          <PlaceComponent
            placeholder="Enter property location..."
            defaultValue={propertyLocation}
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
            className="border rounded-lg text-lg dark:text-dark outline-none focus:border-violet-blue duration-200 px-3 py-2 mt-1 w-full"
          />
          {propertyCoordinateError ? (
            <ErrorMessage field="Enter a valid location" />
          ) : (
            <ErrorMessage field={errors.address?.message} />
          )}
        </div>

        <div>
          <label className="block mb-1.5 mt-3 text-sm font-semibold text-gray-600 ">
            Property Details
          </label>
          <textarea
            {...register("propertyDetails")}
            id="propertyDetails"
            name="propertyDetails"
            className="block p-2.5 w-full h-32 text-lg text-gray-900 bg-gray-50 rounded-lg border outline-none focus:ring-violet-blue duration-200 focus:border-violet-blue resize-none"
            placeholder="Give description about property..."
          ></textarea>
          <ErrorMessage field={errors.propertyDetails?.message} />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-2 py-7">
          <StatefulInputField
            label="Price (COP)"
            name="price"
            id="price"
            type="text"
            containerStyles="w-full"
            disabled={false}
            value={price}
            onChange={handlePriceChange}
            error={priceValidationMsg}
          />
          <div className="w-full">
            <label className="block mb-1.5 mt-6 text-sm font-semibold text-gray-600 ">
              Features
            </label>
            <Select
              placeholder="Features"
              defaultValue={propertyFeatures}
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
        <div className=" flex gap-2">
          <InputField
            label="Interior size (m^2)"
            name="interiorSize"
            id="interiorSize"
            min={10}
            type="number"
            containerStyles="w-full"
            register={register}
            error={errors.interiorSize?.message}
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
                className="absolute bottom-[12px] right-[10px] cursor-pointer"
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
            name="apartmentType"
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
        <div className="flex flex-col">
          <input
            type="file"
            id="file-input"
            {...register("propertyImages")}
            ref={imageRef}
            accept="image/*"
            multiple
            className="py-3 hidden"
            onChange={handleFileChange}
            onClick={(e) => {
              const inputElement = e.target as HTMLInputElement;
              inputElement.value = "";
            }}
          />
          <label
            htmlFor="file-input"
            className="custom-file-input mt-5 mb-2 hover: cursor-pointer rounded bg-violet-blue text-white flex items-center gap-2 text-sm py-2  px-6 hover:scale-95 duration-200 font-medium w-full justify-center"
          >
            Choose Property Images
          </label>
          {imageValidation && <ErrorMessage field="Add a property image" />}
          {sizeError && <ErrorMessage field="Select file up to 5MB" />}
        </div>
        {currentImages?.length > 0 && (
          <div className="flex w-full overflow-auto gap-3 ">
            {currentImages.map((prev, index) => (
              <div className="w-full">
                <MdCancel
                  className="cursor-pointer hover:rotate-180 duration-500 float-right"
                  size={18}
                  onClick={() => handleCurrentImagesChange(prev)}
                />
                <img
                  key={index}
                  src={prev}
                  alt="current-property-img"
                  className="h-[80%] w-[100%]"
                />
              </div>
            ))}
          </div>
        )}
        {imagePreview.length > 0 && (
          <div className="flex w-full overflow-auto gap-3 ">
            {imagePreview.map((prev, index) => (
              <div className="w-full">
                <MdCancel
                  className="cursor-pointer hover:rotate-180 duration-500 float-right"
                  size={18}
                  onClick={() => {
                    dispatch(updateRemovedImageBlob(prev));
                    dispatch(updateRemovedImageIndex(index));
                  }}
                />
                <img
                  key={index}
                  src={prev}
                  alt="property"
                  className="h-[80%] w-[100%]"
                />
                {imageFile[index]?.name}
              </div>
            ))}
          </div>
        )}
        <MapWithDraggableMarker />
        <Button
          text={
            isLoading ? <PacmanLoader color="#fff" size={5} /> : "Add For sale"
          }
          type="submit"
          className="w-full flex justify-center"
          disabled={isAddForSaleBtnDisabled}
        />
      </form>
    </div>
  );
};

export default UpdatePropertyListingForm;
