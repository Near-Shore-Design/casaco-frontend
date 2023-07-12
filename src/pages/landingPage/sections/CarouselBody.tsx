import AutocompleteSearchBar from "components/atoms/AutocompleteSearchBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "utilities/hooks";
import { filteredProperties } from "utilities/reduxSlices/HomePropertySlice";

const CarouselBody = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const searchHouse = (value: string) => {
    dispatch(filteredProperties({ location__in: value }));
    navigate("/buy-house");
  };
  return (
    <>
      <p className="mb-5 text-2xl text-center lg:text-3xl text-white">
        Let's get your dream home.
      </p>
      <div className="w-[70%] lg:w-1/4">
        <AutocompleteSearchBar />
      </div>
    </>
  );
};

export default CarouselBody;
