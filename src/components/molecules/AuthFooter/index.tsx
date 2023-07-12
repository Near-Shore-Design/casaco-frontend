import { AiOutlineUnlock } from "react-icons/ai";
import { MdHelpCenter } from "react-icons/md";
import { Tooltip } from "react-tooltip";

const AuthFooter = () => {
  return (
    <div className="py-5">
      <div>
        <div className="text-center sm:text-right whitespace-nowrap w-fit">
          <div
            className="flex items-center transition duration-200 px-5 cursor-text font-normal text-sm rounded-lg text-gray-500"
            data-tooltip-id="help-icon"
            data-tooltip-content="If you need any help regarding anything, please reach out to us at casa-colombia@casa.com"
          >
            <MdHelpCenter color="#3f51b5" />
            <span className="inline-block ml-1">Help</span>
          </div>
        </div>
      </div>
      <Tooltip id="help-icon" />
      <Tooltip id="forgot-icon" />
    </div>
  );
};

export default AuthFooter;
