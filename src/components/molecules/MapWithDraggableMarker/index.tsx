import Map from "../Map";
import { MarkerF } from "@react-google-maps/api";
import { useAppSelector } from "utilities/hooks";
import { RootState } from "store";
import { useDispatch } from "react-redux";
import { updateCoordinate } from "utilities/reduxSlices/MapSlice";

const MapWithDraggableMarker = () => {
  const { propertyCoordinate, isLoading } = useAppSelector(
    (state: RootState) => state.map
  );

  const onLoad = (map: any) => {
    const bounds = new google.maps.LatLngBounds();
    [propertyCoordinate]?.forEach(({ lat, lng }) =>
      bounds.extend({ lat, lng })
    );
    map?.fitBounds(bounds);
  };

  const dispatch = useDispatch();

  const handleMarkerDragEnd = (event: any) => {
    const lat = event?.latLng?.lat();
    const lng = event?.latLng?.lng();
    dispatch(updateCoordinate({ lat, lng }));
  };
  return (
    <div className="relative h-[350px] w-full my-5 mb-10">
      {isLoading && (
        <div className="absolute w-full h-full bg-black/75 top-0 left-0 right-0 bottom-0 z-10"></div>
      )}
      <p>Drag pin to actual property location</p>
      <Map onLoad={onLoad} center={propertyCoordinate}>
        {propertyCoordinate && (
          <MarkerF
            position={propertyCoordinate}
            draggable={true}
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </Map>
    </div>
  );
};

export default MapWithDraggableMarker;
