import React from "react";
import { Cardprops } from "./type";
import {
  getAllFavoriteProperties,
  removeFromFavorite,
} from "utilities/reduxSlices/HomePropertySlice";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { RootState } from "store";
import { toast } from "react-hot-toast";

const PropertyInfoCard: React.FC<Cardprops> = ({
  name,
  bid,
  room,
  src,
  onClick,
  bath,
  id,
}) => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector((state: RootState) => state.auth);
  const user_id = userData.user_id;
  const removeFav = (id: number) => {
    const data = {
      user_id: user_id,
      property_id: id,
    };
    dispatch(removeFromFavorite(data)).then(() => {
      dispatch(getAllFavoriteProperties(user_id));
      toast.success("Removed From favorites!");
    });
  };
  return (
    <div
      onClick={onClick}
      className=" z-5 relative flex flex-col rounded-[20px] md:max-w-[300px] dark:text-black hover:scale-110 duration-500 cursor-pointer bg-white bg-clip-border shadow-3xl w-full !p-4 3xl:p-![18px] "
    >
      <div className="h-full w-full">
        <div className="relative w-full h-[200px] pb-3">
          <img
            src={src}
            className="mb-3 h-full w-full rounded-xl object-cover 3xl:h-full 3xl:w-full"
            alt=""
          />
        </div>
        <p className="mb-0 text-sm font-semibold max-w-[230px] text-ellipsis overflow-hidden whitespace-nowrap">
          {name}
        </p>
        <div className="flex items-center justify-between md:items-center lg:justify-between ">
          <div className="flex">
            <p className="mb-0 text-sm text-light">
              Current Bid:
              <span className="font-bold"> {`$${bid.toLocaleString()}`}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between md:items-center lg:justify-between ">
          <div className="flex">
            <p className="mb-0 text-sm text-light">
              Rooms: <span className="font-bold">{room}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between md:items-center lg:justify-between ">
          <div className="flex">
            <p className="mb-0 text-sm text-light">
              Baths: <span className="font-bold">{bath}</span>
            </p>
          </div>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <p
            onClick={() => removeFav(id)}
            className="text-light-red text-right m-0 p-0 cursor-pointer"
          >
            Remove from favorites
          </p>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfoCard;
