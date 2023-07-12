import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import "assets/styles/map.scss";

const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

interface MapProp {
  children: React.ReactNode;
  onLoad: (x: any) => void;
  center?: any;
}

const Map: React.FC<MapProp> = ({ children, onLoad, center }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: libraries,
  });

  return (
    <>
      {!isLoaded && <>Loading.......</>}
      {isLoaded && (
        <GoogleMap
          mapContainerClassName="map-container"
          onLoad={onLoad}
          zoom={10}
          center={center}
        >
          {children}
        </GoogleMap>
      )}
    </>
  );
};

export default Map;
