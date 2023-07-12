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
import { useRef, useState } from "react";
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

type Inputs = {
  title: string;
  address: string;
  description: string;
  interior: number;
  price: number;
  department: string;
  exterior: number;
  apartment: string;
  feature: string;
};

interface listFormProp {
  onClose: () => void;
}

const UpdatePropertyListingForm: React.FC<listFormProp> = ({ onClose }) => {
  const { singleProperty } = useAppSelector((state: RootState) => state.home);
  const {
    title,
    beds,
    baths,
    description,
    exterior_size,
    city,
    department,
    location,
    interior_size,
    property_id,
    images,
    types,
  } = singleProperty;

  const bedIndex = findIndexByKeyValuePair(bedsFilter, "value", beds);
  const bathIndex = findIndexByKeyValuePair(bedsFilter, "value", baths);

  const [imageFile, setImageFile] = useState<string>("");
  const [imagePreview, setImageFilePreview] = useState<string>("");
  const [exteriorChange, setExteriorChange] = useState<boolean>(true);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [bed, setBeds] = useState<any>(beds);
  const [exteriorValue, setExteriorValue] = useState<number>(exterior_size);
  const [errorState, setErrorState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [bathBathErrorState, setBathBathErrorState] = useState<boolean>(false);
  const [bath, setBaths] = useState<any>(baths);
  const [featuresValue, setFeaturesValue] = useState<any>([]);
  const [features, setFeatures] = useState<any>([]);
  const [bedsValue, setBedsValue] = useState<any>(bedsFilter[bedIndex]);
  const [bathsValue, setBathsValue] = useState<any>(bedsFilter[bathIndex]);
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
    defaultValues: {
      description: description,
      title: title,
      department: department,
      //   address: address,
      interior: interior_size,
      apartment: types,
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
    setValue("address", input);
    if (input) {
      dispatch(getPropertiesCoordinate(`${input} ${getCity}`));
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

  const handleFileChange = (e: any) => {
    const maxSizeInBytes = 5 * 1024 * 1024;
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

  const onSubmit = (data: Inputs) => {
    if (exteriorChange && exteriorValue > 2000) {
      setErrorState(true);
      setErrorMessage("Maximum value is 2,000");
      return;
    }
    if (bedsValue === null || bathsValue === null) {
      setBathBathErrorState(true);
      setErrorMessage("Bed and bath cannot be empty");
      return;
    } else {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("user_id", String(userData.user_id));
      formData.append("title", data.title);
      formData.append("description", String(data.description));
      formData.append("beds", String(bed));
      formData.append("baths", String(bath));
      formData.append("types", data.apartment);
      formData.append("property_status", "for_sale");
      formData.append("price", String(data.price));
      formData.append("department", data.department);
      formData.append("location", getCity);
      formData.append("address", data.address);
      formData.append("feature", featuresValue.join(", "));
      formData.append("latitude", String(formattedLat));
      formData.append("longitude", String(formattedlng));
      formData.append("exterior_size", String(exteriorValue));
      formData.append("interior_size", String(data.interior));
      {
        imageFile && formData.append("image1", imageFile, "property_image.jpg");
      }

      dispatch(updateListing({ data: formData, id: property_id })).then(() => {
        dispatch(getAllHomeProperties(userData.user_id));
        setIsLoading(false);
        onClose();
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
        <InputField
          label="Title"
          name="title"
          id="title"
          type="text"
          register={register}
          error={errors.title?.message}
        />

        <div className="mt-5">
          <label className="font-semibold text-sm text-gray-600 pb-1 block">
            Location
          </label>
          <PlaceComponent
            placeholder="Enter City"
            defaultValue={city}
            placeSelected={onPlaceSelected}
          />
        </div>

        <div className="">
          <label className="block mb-1.5 mt-3 ml-2 text-sm font-semibold text-gray-600 ">
            Address Line 1
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
            {...register("description")}
            id="description"
            name="description"
            className="block p-2.5 w-full h-32 text-lg text-gray-900 bg-gray-50 rounded-lg border outline-none focus:ring-violet-blue duration-200 focus:border-violet-blue resize-none"
            placeholder="Give description about property..."
          ></textarea>
          <ErrorMessage field={errors.description?.message} />
        </div>
        <div className="flex flex-wrap lg:flex-nowrap gap-2 py-7">
          <InputField
            label="Price"
            name="price"
            id="price"
            type="number"
            register={register}
            containerStyles="w-full "
            error={errors.price?.message}
          />
          <div className="w-full">
            <label className="block mb-1.5 mt-6 text-sm font-semibold text-gray-600 ">
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
        <img src={images?.[0]} alt="property-picture" className="py-4" />

        <MapWithDraggableMarker />
        <Button
          text={
            isLoading ? <PacmanLoader color="#fff" size={5} /> : "Add For sale"
          }
          type="submit"
          className="w-full flex justify-center"
          disabled={!formState.isValid || isLoading}
        />
      </form>
    </div>
  );
};

export default UpdatePropertyListingForm;
