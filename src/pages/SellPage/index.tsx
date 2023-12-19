import { useState, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState } from "store";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { getPropertiesCoordinate } from "utilities/reduxSlices/MapSlice";
import {
  getAllHomeProperties,
  propertyForSale,
} from "utilities/reduxSlices/HomePropertySlice";
import img from "assets/images/house-sale.jpg";
import Button from "components/atoms/Button";
import { useNavigate } from "react-router-dom";
import Footer from "components/molecules/Footer";
import StepOne from "./steps/StepOne";
import StepTwo from "./steps/StepTwo";
import StepThree from "./steps/StepThree";
import Modal from "components/molecules/Modal";
import ProgressBar from "components/molecules/ProgressBar";
import { PacmanLoader } from "react-spinners";
import NotAuthenticatedForm from "components/molecules/NotAuthenticatedForm";
import { saleSchema } from "utilities/Schema/saleSchema";

type Inputs = {
  title: string;
  address: string;
  description: string;
  bed: number;
  image: string;
  price: number;
  interior: number;
  city: string;
  exterior: number;
  bath: number;
  features: string;
  apartment: string;
  department: string;
};

const SellPage: React.FC = () => {
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState<any>([]);
  const [imagePreview, setImageFilePreview] = useState<Array<any>>([]);
  const [sizeError, setSizeError] = useState<boolean>(false);
  const [exteriorChange, setExteriorChange] = useState<boolean>(true);
  const [exteriorValue, setExteriorValue] = useState<number>(0);
  const [bedsValue, setBedsValue] = useState<null>(null);
  const [bathsValue, setBathsValue] = useState<null>(null);
  const [featuresValue, setFeaturesValue] = useState<any>([]);
  const [features, setFeatures] = useState<any>([]);
  const [errorState, setErrorState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [beds, setBeds] = useState<null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [baths, setBaths] = useState<null>(null);
  const [authModalShow, setAuthModalShow] = useState<boolean>(false);
  const [bathBathErrorState, setBathBathErrorState] = useState<boolean>(false);
  const [getCity, setGetCity] = useState<string>("");
  const [imageValidation, setImageValidation] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSellForm, setShowSellForm] = useState(false);
  const [price, setPrice] = useState("");
  const [numericPrice, setNumericPrice] = useState<number>(0);
  const [hasPriceBeenAdded, setHasPriceBeenAdded] = useState<boolean>(false);

  const [locationValue, setLocationValue] = useState<string>("");

  const { propertyCoordinate, propertyCoordinateError } = useAppSelector(
    (state: RootState) => state.map
  );
  const { token } = useAppSelector((state: RootState) => state.auth);
  let imageRef = useRef<HTMLInputElement | null>(null);
  const { userData } = useAppSelector((state: RootState) => state.auth);

  const { removedImageBlob, removedImageIndex } = useAppSelector(
    (state: RootState) => state.sell
  );

  const formattedLat = propertyCoordinate.lat.toFixed(5);
  const formattedlng = propertyCoordinate.lng.toFixed(5);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    formState,
    setValue,
    reset,
    getValues,
    watch,
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(saleSchema),
  });

  const dispatch = useAppDispatch();

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

  const handleFeatures = (selected: any) => {
    setFeatures(selected);
    const values = selected.map((option: any) => option.value);
    setFeaturesValue(values);
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

  const priceValidationMsg =
    hasPriceBeenAdded && (numericPrice < 1 || isNaN(numericPrice))
      ? "Minimum property amount should be 1 Colombian pesos"
      : numericPrice >= 50000000000 &&
        "Maximum property amount can be 50.000.000.000 Colombian pesos";

  const exteriorInputChange = (e: any) => {
    setErrorState(false);
    const value = e.target.value;
    const sanitizedValue = value.replace(/[-e]/gi, "");
    setExteriorValue(sanitizedValue);

    if (exteriorChange && value < 1) {
      setErrorState(true);
      setErrorMessage("Minimum value should be 1");
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
    const valueString = value.toString();
    const decimalRegex = /^-?\d+(\.\d{5,})$/;
    const checkForDecimalPlaces = decimalRegex.test(valueString);
    if (!exteriorChange && checkForDecimalPlaces) {
      setErrorState(true);
      setErrorMessage("Value too large");
    }
  };

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

  const getSearchDebounce = debounce((input) => {
    const encodedAddress = encodeURIComponent(`${input} ${getCity} `);
    setValue("address", input);
    if (input) {
      dispatch(getPropertiesCoordinate(encodedAddress));
    } else {
      return;
    }
  }, 700);

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
      setImageFile((prevImageFiles: any) => [...prevImageFiles, ...validFiles]);

      const imagePreviews = validFiles.map((file) => URL.createObjectURL(file));
      setImageFilePreview((prevImagePreviews) => [
        ...prevImagePreviews,
        ...imagePreviews,
      ]);
    }
  };

  const onSubmit = (data: Inputs) => {
    if (!token.access_token) {
      return setAuthModalShow(true);
    }

    const numericPrice = parseFloat(price.replace(/\./g, "").replace(",", "."));

    if (imageFile !== "") {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("user_id", String(userData.user_id));
      formData.append("title", data.address);
      formData.append("description", String(data.description));
      formData.append("beds", String(beds));
      formData.append("property_status", "for_sale");
      formData.append("price", String(numericPrice));
      formData.append("location", getCity);
      formData.append("baths", String(baths));
      formData.append("types", data.apartment);
      formData.append("location", getCity);
      formData.append("feature", featuresValue.join(", "));
      formData.append("latitude", String(formattedLat));
      formData.append("longitude", String(formattedlng));
      formData.append("exterior_size", String(exteriorValue));
      formData.append("interior_size", String(data.interior));

      (imageFile as File[]).forEach((image: File, index: number) => {
        formData.append(
          `image` + index,
          image,
          "property_sale_img" + index + ".png"
        );
      });
      dispatch(propertyForSale(formData)).then(() => {
        dispatch(getAllHomeProperties(userData.user_id));
        setIsLoading(false);
        navigate("/buy-house");
        reset();
        setBaths(null);
        setBeds(null);
        setBedsValue(null);
        setBathsValue(null);
        featuresValue([]);
      });
    } else {
      setImageValidation(true);
    }
  };

  const onPlaceSelected = (place: any) => {
    const cityValue = place.formatted_address;
    setGetCity(cityValue);
    setLocationValue(cityValue); // Update the locationValue state
  };

  const handleStepForward = () => {
    setCurrentStep((prev) => prev + 1);
  };
  const handleStepBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    {
      component: (
        <StepOne
          register={register}
          errors={errors}
          propertyCoordinateError={propertyCoordinateError}
          onPlaceSelected={onPlaceSelected}
          control={control}
          getSearchDebounce={getSearchDebounce}
          streetChecker={streetChecker}
          locationValue={locationValue}
        />
      ),
    },
    {
      component: (
        <StepTwo
          errorMessage={errorMessage}
          register={register}
          errors={errors}
          propertyCoordinateError={propertyCoordinateError}
          control={control}
          features={features}
          handleFeatures={handleFeatures}
          bedsValue={bedsValue}
          handleBedChange={handleBedChange}
          bathsValue={bathsValue}
          handleBathChange={handleBathChange}
          bathBathErrorState={bathBathErrorState}
          exteriorValue={exteriorValue}
          exteriorChange={exteriorChange}
          exteriorInputChange={exteriorInputChange}
          errorState={errorState}
          handleExteriorChange={handleExteriorChange}
          price={price}
          handlePriceChange={handlePriceChange}
          priceValidationMsg={priceValidationMsg}
        />
      ),
    },
    {
      component: (
        <StepThree
          errors={errors}
          register={register}
          handleFileChange={handleFileChange}
          imageRef={imageRef}
          imageFile={imageFile}
          sizeError={sizeError}
          imageValidation={imageValidation}
          imagePreview={imagePreview}
        />
      ),
    },
  ];

  const values = getValues();

  const watchValues = watch();

  const isStepOneBtnEnabled =
    getCity?.length > 0 &&
    Object.keys(values)?.length > 0 &&
    values?.address !== undefined &&
    values?.address.length > 0 &&
    values?.description.length > 0;

  const isStepTwoBtnEnabled =
    price?.length > 0 &&
    featuresValue?.length > 0 &&
    beds !== null &&
    String(beds)?.length > 0 &&
    baths !== null &&
    String(baths)?.length > 0 &&
    String(values?.interior)?.length > 0 &&
    String(exteriorValue)?.length > 0 &&
    exteriorValue !== 0 &&
    values?.apartment !== undefined &&
    values?.apartment.length > 0 &&
    Object.keys(errors).length === 0 &&
    exteriorValue > 0 &&
    exteriorValue <= 2000;

  useEffect(() => {
    setImageFilePreview((prevState) =>
      prevState.filter((item) => item !== removedImageBlob)
    );
    // @ts-ignore
    setImageFile((prevState) =>
      // @ts-ignore
      prevState.filter((_, index: number) => index !== removedImageIndex)
    );
  }, [removedImageBlob]);

  return (
    <div className="mt-24 p-5">
      <h1 className="font-semibold text-3xl text-violet-blue">
        Sell your home
      </h1>
      <div className="flex flex-wrap lg:flex-nowrap items-center gap-5">
        <div className="text-xl mb-5">
          <p className="mb-8">
            Deciding to sell your home yourself is referred to as
            for-sale-by-owner (FSBO). The FSBO process is similar to traditional
            selling, but without the help of a real estate agent. In this case,
            you’re responsible for the home prep, marketing, showings, and
            negotiations.
          </p>
          <Button
            text="Sell your home"
            type="button"
            onClick={() => setShowSellForm(true)}
          />
          <h2 className="mt-6 font-semibold">Why sell FSBO</h2>
          <ul className="list-disc text-xl py-5 px-5">
            <li>Avoid paying a listing agent commission</li>
            <li>Advertise your listing for free on Zillow</li>
            <li>Flexibility and control from start to finish</li>
          </ul>
        </div>
        <img src={img} alt="" className="w-[40%] rounded" />
      </div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="px-3 pb-5">
          <Modal
            header="Sell your home"
            hide={() => setShowSellForm(false)}
            height="h-[700px]"
            className="overflow-auto "
            isShown={showSellForm}
          >
            <ProgressBar currentStep={currentStep + 1} totalSteps={3} />

            <div className="w-full lg:w-[500px] pt-6 pb-5">
              {currentStep === 0 && (
                <h1 className="mt-5 text-xl font-semibold">
                  Basic Property Information
                </h1>
              )}
              {currentStep === 1 && (
                <h1 className="mt-5 text-xl font-semibold">
                  Property Features
                </h1>
              )}
              {currentStep === 2 && (
                <h1 className="mt-5 text-xl font-semibold">Property Visuals</h1>
              )}
              {steps[currentStep].component}

              <div className="flex gap-5 mt-5">
                {currentStep > 0 && (
                  <button
                    type="button"
                    onClick={handleStepBack}
                    className="w-full flex justify-center border border-violet-blue gap-2 text-sm py-2  px-6 rounded hover:scale-95 duration-200 font-medium cursor-pointer"
                  >
                    Back
                  </button>
                )}
                {currentStep === 2 && (
                  <Button
                    text={
                      isLoading ? (
                        <PacmanLoader color="#fff" size={5} />
                      ) : (
                        "Add property for sale"
                      )
                    }
                    type="submit"
                    className="w-full flex justify-center"
                    // disabled={!formState.isValid || isLoading}
                    disabled={false}
                  />
                )}
                {currentStep < 2 && (
                  <Button
                    text={"Next"}
                    type="button"
                    onClick={handleStepForward}
                    className="w-full flex justify-center"
                    disabled={
                      currentStep === 0
                        ? !isStepOneBtnEnabled
                        : currentStep === 1 && !isStepTwoBtnEnabled
                    }
                  />
                )}
              </div>
            </div>
          </Modal>
        </form>
      </div>
      <Footer />
      <Modal
        header="Sign in or register"
        isShown={authModalShow}
        hide={() => setAuthModalShow(false)}
        height="h-fit"
      >
        <NotAuthenticatedForm onClose={() => setAuthModalShow(false)} />
      </Modal>
    </div>
  );
};

export default SellPage;
