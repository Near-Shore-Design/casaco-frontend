import { RootState } from "store";
import BuyHouseCard from "../BuyHouseCard";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import Button from "components/atoms/Button";
import { getAllProperties } from "utilities/reduxSlices/HomePropertySlice";

const HouseList = () => {
  const dispatch = useAppDispatch();
  const { buyProperties, isLoading } = useAppSelector(
    (state: RootState) => state.home
  );
  const resetButton = () => {
    dispatch(getAllProperties());
  };

  return (
    <div className="relative lg:mt-0 w-full lg:w-[50%] h-screen lg:h-[90vh] lg:overflow-auto px-3 ">
      {/* {isLoading && (
        <div className="absolute top-0 left-0 bottom-0 bg-black/60 w-full h-screen" />
      )} */}
      {buyProperties?.map(
        (
          {
            title,
            price,
            images,
            description,
            location,
            property_id,
            favourite,
          },
          idx
        ) => (
          <BuyHouseCard
            key={idx}
            src={
              images?.[0] ||
              "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
            }
            header={title}
            description={description}
            location={location}
            price={Math.round(parseFloat(price))}
            id={property_id}
            favourites={favourite}
          />
        )
      )}

      {buyProperties?.length === 0 && (
        <div>
          <h1 className="text-2xl font-semibold ">
            Sorry, there is no result for your search at the moment.
          </h1>
          <div className="flex justify-center mt-5">
            <Button
              text="Reset Properties"
              type="button"
              onClick={resetButton}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseList;
