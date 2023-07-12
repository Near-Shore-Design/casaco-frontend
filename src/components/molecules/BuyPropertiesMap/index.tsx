import { useAppDispatch, useAppSelector } from "utilities/hooks";
import Map from "../Map";
import { RootState } from "store";
import { InfoWindowF, MarkerF, PolygonF } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { clearPolygonCoordinates } from "utilities/reduxSlices/MapSlice";
import axios from "axios";

const BuyPropertiesMap = () => {
  const { buyProperties } = useAppSelector((state: RootState) => state.home);
  const { polygonCoordinates, centerMap } = useAppSelector(
    (state: RootState) => state.map
  );
  const [geoJSONData, setGeoJSONData] = useState<Array<any>>([]);
  const listener = useRef(true);

  useEffect(() => {
    if (!polygonCoordinates) {
      dispatch(clearPolygonCoordinates());
    }
  }, []);

  useEffect(() => {
    if (listener.current) {
      const url = `https://nominatim.openstreetmap.org/search.php?q=${encodeURIComponent(
        polygonCoordinates
      )}&polygon_geojson=1&format=json`;

      if (polygonCoordinates !== "") {
        axios
          .get(url)
          .then((response) => {
            const polygonIndex = response.data.findIndex(
              (item: any) => item.geojson.type === "Polygon"
            );
            if (polygonIndex !== -1) {
              setGeoJSONData((prevData) => [
                ...prevData,
                response.data[polygonIndex]?.geojson,
              ]);
            }
          })
          .catch((error) => {
            console.error("Error fetching GeoJSON data:", error);
          });
      } else {
        setGeoJSONData([]);
      }
    }
  }, [polygonCoordinates]);

  const onLoad = (map: any) => {
    const bounds = new google.maps.LatLngBounds();
    buyProperties?.forEach(
      ({ latitude, longitude }: { latitude: number; longitude: number }) => {
        bounds.extend({ lat: Number(latitude), lng: Number(longitude) });
        return map.fitBounds(bounds);
      }
    );
  };
  const [hoveredMarker, setHoveredMarker] = useState(null);

  const handleMarkerHover = (marker: any) => {
    setHoveredMarker(marker);
  };

  const dispatch = useAppDispatch();

  return (
    <div className="block w-full lg:w-[50%] h-full relative">
      <Map onLoad={onLoad} center={centerMap}>
        {buyProperties?.map(
          ({ latitude, longitude, location, images, price }, idx) => (
            <MarkerF
              key={idx}
              position={{ lat: Number(latitude), lng: Number(longitude) }}
              onMouseOver={() => handleMarkerHover(idx)}
              onMouseOut={() => handleMarkerHover(null)}
            >
              {hoveredMarker === idx && (
                <InfoWindowF>
                  <div className="w-[100px]">
                    <div className="flex">
                      {location}
                      {Number(price).toLocaleString()}
                    </div>
                    <img src={images?.[0]} alt="" className="w-full h-full" />
                  </div>
                </InfoWindowF>
              )}
            </MarkerF>
          )
        )}

        {geoJSONData.length > 0 && (
          <>
            {geoJSONData.map((polygon: any, index: number) => (
              <PolygonF
                key={index}
                path={polygon.coordinates[0]?.map(
                  ([lng, lat]: [lng: number, lat: number]) => ({
                    lat,
                    lng,
                  })
                )}
                options={{ strokeColor: "#FF0000", fillColor: "transparent" }}
              />
            ))}
          </>
        )}
      </Map>
    </div>
  );
};

export default BuyPropertiesMap;
