import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { BsFillHouseHeartFill } from "react-icons/bs";
import Modal from "../Modal";
import PropertyListingForm from "../PropertyListingForm";

const HomeEmptyState = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center">
      <BsFillHouseHeartFill size={200} />
      <p
        onClick={() => setShowForm(true)}
        className="flex py-1 px-2 rounded-md justify-center items-center gap-3 cursor-pointer bg-violet-blue text-white hover:text-black hover:bg-transparent border duration-200 hover:border-violet-blue dark:text-white"
      >
        Add your current property <AiOutlineArrowRight />
      </p>
      <Modal
        className="h-fit"
        header="List Property"
        isShown={showForm}
        hide={() => setShowForm(false)}
      >
        <PropertyListingForm onClose={() => setShowForm(false)} />
      </Modal>
    </div>
  );
};

export default HomeEmptyState;
