import PlaceComponent from "components/molecules/GoogleCityComponent";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getMainPageSearchQuery,
  getPolygonCoordinates,
} from "utilities/reduxSlices/MapSlice";

const AutoCompleteSearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onPlaceSelected = (place: any) => {
    const value = place.formatted_address;
    dispatch(getMainPageSearchQuery(value));
    const firstWord = value.split(",").shift();
    dispatch(getPolygonCoordinates(firstWord));
    navigate("/buy-house");
  };
  return (
    <div>
      <PlaceComponent
        placeholder="Enter city, address place"
        defaultValue=""
        className="rounded-full"
        placeSelected={onPlaceSelected}
      />
    </div>
  );
};

export default AutoCompleteSearchBar;
