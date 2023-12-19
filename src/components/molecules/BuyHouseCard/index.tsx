import Button from "components/atoms/Button";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { CiLocationOn, CiExport } from "react-icons/ci";
import { Tooltip } from "react-tooltip";
import Modal from "../Modal";
import SingleHouseModalComponent from "../SingeleHouseMModalCommponent";
import { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import {
  addToFavorite,
  getAllProperties,
  getNotAuthenticatedPropertyId,
  getSingleProperty,
  getAllFavoriteProperties,
} from "utilities/reduxSlices/HomePropertySlice";
import { buyCardProps } from "./types";
import { RootState } from "store";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { toast } from "react-hot-toast";
import SocialShareComponent from "../ShareComponent";
import FavoriteNotAuthenticated from "../FavoriteNotAuthenticatedForm";

const BuyHouseCard: React.FC<buyCardProps> = ({
  src,
  description,
  location,
  header,
  id,
  favourites,
  price,
}) => {
  const dispatch = useAppDispatch();
  const [showHouse, setShowHouse] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showShareContent, setShowShareContent] = useState<boolean>(false);

  const showPropertyDetail = (id: number) => {
    dispatch(getSingleProperty(id)).then(() => {
      setShowHouse(true);
    });
  };
  const hideForm = () => {
    setShowForm(false);
  };
  const { userData, token } = useAppSelector((state: RootState) => state.auth);

  const addToFavouriteList = (id: number) => {
    const data = {
      user_id: userData.user_id,
      property_id: id,
    };
    const userID = data?.user_id;
    const propertyID = data?.property_id;
    if (!token.access_token) {
      setShowForm(true);
      dispatch(getNotAuthenticatedPropertyId(id));
    } else {
      dispatch(addToFavorite(data)).then(() => {
        let favProperties: any[];
        dispatch(getAllFavoriteProperties(userID)).then((data: any) => {
          favProperties = data?.payload;
          favProperties?.some(
            (favProperty: any) => favProperty?.property_id === propertyID
          )
            ? toast.success("Added to favorites!")
            : toast.success("Removed from favorites!");
          dispatch(getAllProperties());
        });
      });
    }
  };
  const closePropertyDetail = () => {
    setShowHouse(false);
  };

  return (
    <div
      onClick={() => showPropertyDetail(id)}
      className="flex flex-col lg:flex-row shadow-xl rounded-md my-3 cursor-pointer"
    >
      <img
        src={src}
        alt=""
        className="rounded-t-md md:max-w-[300px] h-[230px] object-cover bg-no-repeat w-full lg:rounded-l-md"
      />
      <div className="w-full pb-2 px-3">
        <div className="flex justify-between pt-4">
          <p className="text-2xl font-semibold">{`COP ${price.toLocaleString(
            "es-CO"
          )}`}</p>
          <div onClick={(e: any) => e.stopPropagation()} className="flex gap-4">
            <CiExport
              data-tooltip-id="share"
              data-tooltip-content="Share"
              onClick={() => setShowShareContent(true)}
              size={22}
            />
            <div onClick={() => addToFavouriteList(id)}>
              {!favourites && (
                <AiOutlineHeart
                  data-tooltip-id="add-to-fav"
                  data-tooltip-content="Add to fav"
                  color="#fc0317"
                  size={22}
                />
              )}

              {favourites && (
                <AiFillHeart
                  data-tooltip-id="remove-from-fav"
                  data-tooltip-content="Remove from fav"
                  color="#fc0317"
                  size={22}
                />
              )}
            </div>
          </div>
        </div>
        <h2 className="font-bold text-xl py-2">{header}</h2>
        <h1 className="font-semibold text-sm py-2">{description}</h1>

        <div className="flex items-center mt-2">
          <span>
            <CiLocationOn size={20} />
          </span>
          <p>{location}</p>
        </div>
        <div className="flex justify-between items-center mt-5">
          <h4 className="font-semibold text-base text-slate-900 dark:text-white hover:text-white cursor-pointer hover:bg-slate-800 py-1 px-2 rounded">
            Agent
          </h4>

          <Button
            text="View Info"
            type="button"
            onClick={() => showPropertyDetail(id)}
          />
        </div>
      </div>

      {/* modals */}
      <Modal
        header="House"
        isShown={showHouse}
        hide={closePropertyDetail}
        className="w-full"
        id={id}
      >
        <SingleHouseModalComponent favourites={favourites} />
      </Modal>

      <Modal
        className="h-fit"
        header="Sign in or register to save home"
        isShown={showForm}
        hide={hideForm}
      >
        <FavoriteNotAuthenticated onClose={() => setShowForm(false)} />
      </Modal>

      <Modal
        className="h-fit"
        header="Share Property"
        isShown={showShareContent}
        hide={() => setShowShareContent(false)}
      >
        <SocialShareComponent
          description={description}
          title={header}
          id={id}
          src={src}
        />
      </Modal>

      {/* tooltips */}
      <Tooltip id="add-to-fav" />
      <Tooltip id="remove-from-fav" />
      <Tooltip id="share" />
    </div>
  );
};

export default BuyHouseCard;
