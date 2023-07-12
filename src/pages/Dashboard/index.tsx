import Tab from "components/molecules/tab";
import MyHomes from "./sections/MyHomes";
import Favourites from "pages/Dashboard/sections/Favourites";
import { useEffect, useRef, useState } from "react";
import {
  getAllFavoriteProperties,
  getAllHomeProperties,
} from "utilities/reduxSlices/HomePropertySlice";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { RootState } from "store";
import Modal from "components/molecules/Modal";
import PropertyListingForm from "components/molecules/PropertyListingForm";
import Button from "components/atoms/Button";
import Footer from "components/molecules/Footer";

const Dashboard = () => {
  const { homeProperties } = useAppSelector((state: RootState) => state.home);
  const dispatch = useAppDispatch();
  const listener = useRef(true);
  const { userData } = useAppSelector((state: RootState) => state.auth);
  const [listForm, setListForm] = useState<boolean>(false);
  const user_id = userData.user_id;
  useEffect(() => {
    if (listener.current) {
      listener.current = false;
      dispatch(getAllFavoriteProperties(user_id));
      dispatch(getAllHomeProperties(user_id));
    }
    const timer = setTimeout(() => {}, 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tabs = [
    { title: "My Home", component: <MyHomes /> },
    { title: "Favorites", component: <Favourites /> },
  ];
  return (
    <>
      <div className="p-4 pb-10 md:pt-[7rem]">
        <div className="flex justify-between items-baseline mb-4">
          <h1 className="text-sm lg:text-xl font-bold text-violet-blue">
            My Dashboard
          </h1>
          {homeProperties?.length > 0 && (
            <Button
              text="Add your current property"
              type="button"
              className="mt-3"
              onClick={() => setListForm(true)}
            />
          )}
        </div>
        <Tab styles="text-xs" tabs={tabs} />
        <Modal
          className="h-fit"
          header="List your property"
          isShown={listForm}
          hide={() => setListForm(false)}
        >
          <PropertyListingForm onClose={() => setListForm(false)} />
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
