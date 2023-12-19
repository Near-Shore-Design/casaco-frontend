import Button from "components/atoms/Button";
import CarouselwithManualSlide from "components/molecules/Carousel/CarouselType/CarouselwithManualSlide";
import HomeEmptyState from "components/molecules/EmptyState/Home";
import Modal from "components/molecules/Modal";
import UpdatePropertyListingForm from "components/molecules/updateListingForm";
import { useState } from "react";
import { RootState } from "store";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { getSingleProperty } from "utilities/reduxSlices/HomePropertySlice";

const MyHomes = () => {
  const { homeProperties, homePropertyIndex } = useAppSelector(
    (state: RootState) => state.home
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [sellHomeLoadingState, setSellHomeLoadingState] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleSellHome = () => {
    setSellHomeLoadingState(true);
    const property_id = homeProperties[homePropertyIndex].property_id;
    dispatch(getSingleProperty(property_id)).then((data) => {
      if (data.payload) {
        setSellHomeLoadingState(false);
        setShowModal(true);
      }
    });
  };
  return (
    <>
      {homeProperties?.length < 1 && <HomeEmptyState />}
      {!homeProperties && <HomeEmptyState />}
      {homeProperties?.length > 0 && (
        <div className="flex-col lg:flex-row flex gap-3">
          <CarouselwithManualSlide
            carouselSlides={homeProperties}
            currentIndex={homePropertyIndex}
          />

          <div className="w-full mt-6 md:mt-10">
            <h1 className="font-semibold mb-3 text-xl">
              {homeProperties[homePropertyIndex]?.title}
            </h1>
            <h2 className="font-bold ">Overview</h2>
            <p className="mb-2">
              {homeProperties[homePropertyIndex]?.description}
            </p>
            <h2 className="font-bold">Details</h2>
            <p>{`${homeProperties[homePropertyIndex]?.beds} beds`}</p>
            <p>{`${homeProperties[homePropertyIndex]?.baths} baths`}</p>

            {/* {homeProperties[homePropertyIndex]?.property_status !==
              "for_sale" && ( */}
            <Button
              text="Sell your home"
              type="button"
              disabled={sellHomeLoadingState}
              className="mt-3"
              onClick={handleSellHome}
            />
            {/* )} */}
          </div>
        </div>
      )}

      <Modal
        isShown={showModal}
        hide={() => setShowModal(false)}
        header="Sell your home"
        height="h-fit"
      >
        <UpdatePropertyListingForm onClose={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default MyHomes;
