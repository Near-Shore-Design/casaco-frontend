import Button from "components/atoms/Button";
import Tab from "components/molecules/tab";
import OverviewTab from "./OverviewTab";
import FactsTab from "./FactsTab";
import HomeValueTab from "./HomeValueTab";
import Modal from "components/molecules/Modal";
import TourForm from "components/molecules/TourForm";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { RootState } from "store";
import NotAuthenticatedForm from "components/molecules/NotAuthenticatedForm";
import { scheduledTourDate } from "utilities/reduxSlices/HomePropertySlice";

interface rightsectionProp {
  header: string | undefined;
  price: number | undefined;
  bed: number | undefined;
  bath: number | undefined;
  description: string | undefined;
  status: string | undefined;
  interior_size: string;
  exterior_size: number;
  features: string[];
  value: number;
  property_id: number;
}
const RightSection: React.FC<rightsectionProp> = ({
  header,
  bed,
  bath,
  price,
  description,
  status,
  interior_size,
  features,
  exterior_size,
  property_id,
  value,
}) => {
  const { token } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [openTourForm, setOpenTourForm] = useState<boolean>(false);
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);

  const singlePropertyTab = [
    {
      title: "Overview",
      component: <OverviewTab overview={description} />,
    },
    {
      title: "Features",
      component: (
        <FactsTab
          features={features}
          interior_size={interior_size}
          exterior_size={exterior_size}
          beds={bed}
          baths={bath}
        />
      ),
    },
    { title: "Home Value", component: <HomeValueTab value={value} /> },
  ];

  const requestTour = () => {
    dispatch(scheduledTourDate(property_id));
    if (!token.access_token) {
      setOpenAuthModal(true);
    } else {
      setOpenTourForm(true);
    }
  };
  return (
    <div className="w-full lg:w-[40%]">
      <div className="flex items-center mt-4">
        <h1 className="text-3xl font-semibold">{`COP ${price?.toLocaleString(
          "es-CO"
        )}`}</h1>
        <span className="ml-3 px-2">
          <strong>{bed}</strong> beds
        </span>
        <span className="px-2 border-x-black border-x">
          <strong>{bath}</strong> baths
        </span>
        <span className=" px-2">
          <strong>{`${Math.ceil(Number(interior_size))}`} &#13217;</strong>
        </span>
      </div>

      <p className="text-base my-2">{header}</p>
      {status === "for_sale" && (
        <div className="flex items-center gap-1 my-2">
          <span className="w-[10px] h-[10px] bg-light-red rounded-full"></span>
          <p>Up for sale</p>
        </div>
      )}

      {status === "for_rent" && (
        <div className="flex items-center gap-1 my-2">
          <span className="w-[10px] h-[10px] bg-green-600 rounded-full"></span>
          <p>Up for Rent</p>
        </div>
      )}

      <div className="flex gap-3 py-4 border-b border-b-gray-950">
        <Button text="Request for a tour" type="button" onClick={requestTour} />
      </div>
      <Tab
        buttonsStyles="pl-[6rem] xl:pl-0 lg:pl-0 pb-3"
        tabs={singlePropertyTab}
        componentClass="overflow-auto"
      />

      <Modal
        isShown={openAuthModal}
        hide={() => setOpenAuthModal(false)}
        header="Sign-in to schedule tour"
        height="h-fit"
      >
        <NotAuthenticatedForm onClose={() => setOpenAuthModal(false)} />
      </Modal>
      <Modal
        isShown={openTourForm}
        header="Tour Request"
        hide={() => setOpenTourForm(false)}
        className="w-full max-w-[450px] h-fit"
      >
        <TourForm closeForm={() => setOpenTourForm(false)} />
      </Modal>
    </div>
  );
};

export default RightSection;
