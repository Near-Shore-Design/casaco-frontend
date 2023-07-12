import Button from "components/atoms/Button";
import FilterBy from "components/atoms/FilterBy";
import BuyPropertiesMap from "components/molecules/BuyPropertiesMap";
import AccomodationType from "components/molecules/Filter/sections/AccomodationType";
import Amenities from "components/molecules/Filter/sections/Amenities";
import MoreFilter from "components/molecules/Filter/sections/MoreFilter";
import Price from "components/molecules/Filter/sections/Price";
import PropertySize from "components/molecules/Filter/sections/PropertySize";
import HouseList from "components/molecules/HouseList";
import Modal from "components/molecules/Modal";
import MultiSelectAutoComplete from "components/molecules/MultiSelectAutoComplete";
import SingleHouseModalComponent from "components/molecules/SingeleHouseMModalCommponent";
import { useState, useEffect, useRef } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsMap } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { RootState } from "store";
import { useWindowResize } from "utilities/helper-functions";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import {
  getAllFavoriteProperties,
  getAllProperties,
  getSingleProperty,
} from "utilities/reduxSlices/HomePropertySlice";

const BuyPage = () => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const [showHouse, setShowHouse] = useState<boolean>(false);
  const [currentProperty, setCurrentProperty] = useState<any>(null);
  const [changeNavbarStyle, setChangeNavbarStyle] = useState<boolean>(false);
  const [showFilterOptions, setShowFilterOptions] = useState<boolean>(false);
  const [price, setPrice] = useState<boolean>(false);
  const [bedRoom, setBedRoom] = useState<boolean>(false);
  const [homeType, setHomeType] = useState<boolean>(false);
  const [propertySize, setPropertySize] = useState<boolean>(false);
  const [moreFilter, setMoreFilter] = useState<boolean>(false);

  const menuPortalTargetRef = useRef<HTMLDivElement>(null);

  const toggleMap = () => {
    setShowMap((prev) => !prev);
  };

  useWindowResize(() => {
    if (window.innerWidth > 1024) {
      setShowMap(false);
    }
  });
  const { userData, isLoading } = useAppSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useAppDispatch();
  const location = useLocation();
  const listener = useRef(true);
  useEffect(() => {
    if (listener.current) {
      listener.current = false;
      if (userData.user_id) {
        dispatch(getAllFavoriteProperties(userData?.user_id)).then(() => {
          dispatch(getAllProperties());
        });
      } else {
        dispatch(getAllProperties());
      }

      const searchParams = new URLSearchParams(location.search);
      const propertyId = searchParams.get("property_id");
      const id = Number(propertyId);
      if (propertyId) {
        dispatch(getSingleProperty(id));
        setCurrentProperty(id);
        setShowHouse(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeNavbar = () => {
    if (window.scrollY >= 100) {
      setChangeNavbarStyle(true);
    } else {
      setChangeNavbarStyle(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);
    return () => window.removeEventListener("scroll", changeNavbar);
  });

  return (
    <div className="relative lg:pt-[4.75rem]">
      <div className="hidden md:flex fixed w-full bg-charcoal flex-wrap items-end justify-between py-4 px-3 border-t border-gray-500 z-[1]">
        <FilterBy />
      </div>
      <div
        className={`fixed ${
          changeNavbarStyle ? "top-0" : "top-[55px]"
        }  bg-platinum flex lg:hidden px-10 w-full py-3 duration-150 items-center justify-center gap-4 z-10`}
      >
        <MultiSelectAutoComplete
          menuPortalTargetRef={menuPortalTargetRef}
          width={250}
        />
        <Button
          text="Filters"
          type="button"
          onClick={() => setShowFilterOptions((prev) => !prev)}
        />
      </div>

      <div
        className={`fixed bg-charcoal ${
          showFilterOptions ? "h-fit p-5" : "h-0 p-0 overflow-hidden"
        }  text-white top-12 bottom-5 rounded duration-150 flex flex-col flex-wrap items-center z-10`}
      >
        <p
          onClick={() => {
            setShowFilterOptions(false);
            setPrice(true);
          }}
          className="py-2 cursor-pointer hover:text-violet-blue"
        >
          Price
        </p>
        <p
          onClick={() => {
            setShowFilterOptions(false);
            setBedRoom(true);
          }}
          className="py-2 cursor-pointer hover:text-violet-blue"
        >
          Beds and Baths
        </p>
        <p
          onClick={() => {
            setShowFilterOptions(false);
            setHomeType(true);
          }}
          className="py-2 cursor-pointer hover:text-violet-blue"
        >
          Home type
        </p>
        <p
          onClick={() => {
            setShowFilterOptions(false);
            setPropertySize(true);
          }}
          className="py-2 cursor-pointer hover:text-violet-blue"
        >
          Size
        </p>
        <p
          onClick={() => {
            setShowFilterOptions(false);
            setMoreFilter(true);
          }}
          className="py-2 cursor-pointer hover:text-violet-blue"
        >
          More filter
        </p>
      </div>

      <div className="hidden lg:flex border-t border-slate-600 pt-20 lg:h-screen">
        <BuyPropertiesMap />
        <HouseList />
      </div>

      <div className="flex lg:hidden border-t border-slate-600 pt-10 h-[500px] ">
        {showMap && <BuyPropertiesMap />}
        {!showMap && <HouseList />}
      </div>

      <div
        onClick={toggleMap}
        className="flex md:hidden bg-charcoal text-white fixed z-10 p-3.5 bottom-10 left-1/2 transform -translate-x-1/2 rounded"
      >
        {!showMap && (
          <div className="flex gap-2 items-center">
            <span>
              <BsMap />
            </span>
            Map
          </div>
        )}
        {showMap && (
          <div className="flex gap-2 items-center">
            <span>
              <AiOutlineUnorderedList />
            </span>
            List
          </div>
        )}
      </div>

      {/* Modals */}
      <Modal
        header="House"
        isShown={showHouse}
        hide={() => setShowHouse(false)}
        className="w-full"
        id={currentProperty}
      >
        <SingleHouseModalComponent />
      </Modal>

      <Modal
        header="Price"
        isShown={price}
        hide={() => setPrice(false)}
        height="h-fit"
      >
        <Price onClick={() => setPrice(false)} />
      </Modal>
      <Modal
        header="Bed and Bathroom"
        isShown={bedRoom}
        hide={() => setBedRoom(false)}
        height="h-fit"
      >
        <Amenities onClick={() => setBedRoom(false)} />
      </Modal>
      <Modal
        header="Home Type"
        isShown={homeType}
        hide={() => setHomeType(false)}
        height="h-fit"
      >
        <AccomodationType onClick={() => setHomeType(false)} />
      </Modal>

      <Modal
        header="Property size"
        isShown={propertySize}
        hide={() => setPropertySize(false)}
        height="h-fit"
      >
        <PropertySize onClick={() => setPropertySize(false)} />
      </Modal>

      <Modal
        header="More filters"
        isShown={moreFilter}
        hide={() => setMoreFilter(false)}
        height="h-fit"
      >
        <MoreFilter onClick={() => setMoreFilter(false)} />
      </Modal>
    </div>
  );
};

export default BuyPage;
