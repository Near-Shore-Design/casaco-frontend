import searchIcon from "assets/svgs/searchIcon.svg";
import InputField from "../InputField";
import Button from "components/atoms/Button";
import { BsFilterRight } from "react-icons/bs";
import Modal from "components/molecules/Modal";
import Price from "components/molecules/Filter/sections/Price";
import { useRef, useState } from "react";
import Amenities from "components/molecules/Filter/sections/Amenities";
import AccomodationType from "components/molecules/Filter/sections/AccomodationType";
import MultiSelectAutoComplete from "components/molecules/MultiSelectAutoComplete";
import PropertySize from "components/molecules/Filter/sections/PropertySize";
import MoreFilter from "components/molecules/Filter/sections/MoreFilter";

const FilterByProp = () => {
  const [price, setPrice] = useState<boolean>(false);
  const [bedRoom, setBedRoom] = useState<boolean>(false);
  const [homeType, setHomeType] = useState<boolean>(false);
  const [propertySize, setPropertySize] = useState<boolean>(false);
  const [moreFilter, setMoreFilter] = useState<boolean>(false);
  const menuPortalTargetRef = useRef<HTMLDivElement>(null);

  const showPriceModal = () => {
    setPrice(true);
  };
  const showBedRoomModal = () => {
    setBedRoom(true);
  };
  const showHomeTypeModal = () => {
    setHomeType(true);
  };
  const showPropertySizeModal = () => {
    setPropertySize(true);
  };

  const showMoreFilterModal = () => {
    setMoreFilter(true);
  };

  return (
    <>
      <div className="relative flex items-end gap-1 ">
        <MultiSelectAutoComplete menuPortalTargetRef={menuPortalTargetRef} />

        <Button
          className="hidden lg:flex"
          type="button"
          text="Price"
          onClick={showPriceModal}
          iconFront={<BsFilterRight size={20} />}
        />
        <Button
          className="hidden lg:flex"
          type="button"
          text="Bed and bath"
          onClick={showBedRoomModal}
          iconFront={<BsFilterRight size={20} />}
        />
        <Button
          className="hidden lg:flex"
          type="button"
          text="Home Type"
          onClick={showHomeTypeModal}
          iconFront={<BsFilterRight size={20} />}
        />
        <Button
          className="hidden lg:flex"
          type="button"
          text="Size"
          onClick={showPropertySizeModal}
          iconFront={<BsFilterRight size={20} />}
        />
        <Button
          className=""
          type="button"
          text="More Filter"
          onClick={showMoreFilterModal}
          iconFront={<BsFilterRight size={20} />}
        />
        <div className="fixed top-0 left-0" ref={menuPortalTargetRef}></div>

        {/* Modals */}

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
    </>
  );
};

export default FilterByProp;
