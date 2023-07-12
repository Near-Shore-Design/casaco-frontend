import { AiOutlineArrowRight } from "react-icons/ai";
import { BsFillHouseHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import PlaceComponent from "../GoogleCityComponent";

const FavouriteEmptyState = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center">
      <BsFillHouseHeartFill size={200} />
      <p
        onClick={() => navigate("/buy-house")}
        className="flex py-1 px-2 rounded-md justify-center items-center dark:text-white gap-3 cursor-pointer bg-violet-blue text-white hover:text-black hover:bg-transparent border duration-200 hover:border-violet-blue"
      >
        Add to your favorite list <AiOutlineArrowRight />
      </p>
    </div>
  );
};

export default FavouriteEmptyState;
