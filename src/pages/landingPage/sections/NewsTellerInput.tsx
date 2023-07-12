const NewsTellerInput = () => {
  return (
    <div className="w-full lg:w-[50%] mx-auto mt-4">
      <form className="rounded-lg bg-white py-4 lg:py-10 px-4 lg:px-10 shadow-lg">
        <div className="mb-4 flex items-center">
          <input
            type="text"
            className="w-full text-black h-14 outline-none rounded border focus:border-violet-blue border-gray-400 p-2"
            placeholder="Email"
          />
          <button className="ml-2 rounded bg-violet-blue h-14 p-2 text-white hover:scale-95 hover:bg-violet-blue duration-200">
            SUBSCRIBE
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsTellerInput;
