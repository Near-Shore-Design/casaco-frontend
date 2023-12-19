import { useEffect } from "react";
import Card from "components/molecules/PropertyInfoCard";
import Modal from "components/molecules/Modal";
import SingleHouseModalComponent from "components/molecules/SingeleHouseMModalCommponent";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { RootState } from "store";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import FavouriteEmptyState from "components/molecules/EmptyState/Favourites";
import { getSingleProperty } from "utilities/reduxSlices/HomePropertySlice";
import PlaceComponent from "components/molecules/GoogleCityComponent";

const Favourites = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { favProperties } = useAppSelector((state: RootState) => state.home);
  const [show, setShow] = useState(false);
  const showProperty = (id: number) => {
    dispatch(getSingleProperty(id));
    setShow(true);
  };
  const hideProperty = () => {
    setShow(false);
  };

  useEffect(() => {
    hideProperty();
  }, [favProperties]);
  return (
    <div>
      <div className=" ">
        <Modal
          header="House"
          isShown={show}
          hide={hideProperty}
          className="w-full"
        >
          <SingleHouseModalComponent favourites={true} />
        </Modal>
        {favProperties && favProperties.length <= 0 && <FavouriteEmptyState />}
        {!favProperties && <FavouriteEmptyState />}
        {favProperties && favProperties?.length > 0 && (
          <div className="flex flex-wrap gap-5  justify-center">
            {favProperties?.map(
              ({ images, title, property_id, price, beds, baths }: any) => (
                <Card
                  onClick={() => showProperty(property_id)}
                  key={property_id}
                  src={
                    images
                      ? images?.[0]
                      : "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                  }
                  name={title}
                  id={property_id}
                  bid={Math.round(parseFloat(price))}
                  room={beds}
                  bath={baths}
                />
              )
            )}
          </div>
        )}
        {favProperties && favProperties?.length > 0 && (
          <div className="flex py-8 justify-center ">
            <p
              onClick={() => navigate("/buy-house")}
              className="flex text-center w-fit justify-center items-center gap-3 cursor-pointer hover:text-violet-blue"
            >
              Add more to your favorites list
              <span>
                <AiOutlineArrowRight />
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
