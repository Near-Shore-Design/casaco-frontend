import { useAppSelector } from "utilities/hooks";
import LeftSection from "./sections/LeftSection";
import RightSection from "./sections/RightSection.tsx";
import { RootState } from "store";

const SingleHouseModalComponent = () => {
  const { singleProperty } = useAppSelector((state: RootState) => state.home);

  return (
    <div className="h-full dark:text-dark w-full flex flex-col lg:flex-row gap-4 overflow-auto pb-10">
      <LeftSection src={singleProperty?.images?.[0]} />
      <RightSection
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
      />
    </div>
  );
};

export default SingleHouseModalComponent;
