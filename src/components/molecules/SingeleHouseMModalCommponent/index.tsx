import { useAppSelector } from "utilities/hooks";
import LeftSection from "./sections/LeftSection";
import RightSection from "./sections/RightSection.tsx";
import { RootState } from "store";
import SinglePropertySlide from "../Carousel/CarouselType/SinglePropertySlide";

interface SingleHouseModalComponentI {
  favourites?: boolean;
}

const SingleHouseModalComponent = ({
  favourites,
}: SingleHouseModalComponentI): JSX.Element => {
  const { singleProperty } = useAppSelector((state: RootState) => state.home);

  return (
    <div className="h-full dark:text-dark w-full flex flex-col lg:flex-row gap-4 overflow-auto pb-10">
      {/* <LeftSection src={singleProperty?.images?.[0]} /> */}
      <SinglePropertySlide carouselImages={singleProperty?.images} />
      <RightSection
        src={singleProperty?.images?.[0]}
        property_id={singleProperty?.property_id}
        value={Math.round(parseFloat(singleProperty?.total))}
        features={singleProperty?.feature}
        header={singleProperty?.title}
        price={Math.round(parseFloat(singleProperty?.price))}
        bed={singleProperty?.beds}
        bath={singleProperty?.baths}
        description={singleProperty?.description}
        status={singleProperty?.property_status}
        interior_size={singleProperty?.interior_size?.toLocaleString()}
        exterior_size={singleProperty?.exterior_size}
        favourites={favourites}
      />
    </div>
  );
};

export default SingleHouseModalComponent;
