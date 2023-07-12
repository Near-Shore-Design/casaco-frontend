import NewsTellerInput from "pages/landingPage/sections/NewsTellerInput";

const NewsTellerForm = () => {
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center px-5 lg:px-20 py-20  ">
      <div className="flex flex-col flex-[50%] text-left">
        <h2 className="text-[34px] font-bold mb-4">Stay in the know</h2>
        <p className="text-base">
          Receive personalized content that fits your needs
        </p>
      </div>
      <NewsTellerInput />
    </div>
  );
};

export default NewsTellerForm;
