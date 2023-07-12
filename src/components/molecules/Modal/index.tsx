import { MdOutlineCancel } from "react-icons/md";
import { ModalProps } from "./types";
import { useEffect, useRef } from "react";

const Modal: React.FC<ModalProps> = ({
  isShown,
  header,
  hide,
  children,
  height,
  className,
  id,
}) => {
  const listener = useRef(true);
  useEffect(() => {
    if (listener.current) {
      if (id) {
        if (!isShown) {
          return window.history.replaceState(
            null,
            "",
            `${window.location.pathname}`
          );
        } else {
          if (id) {
            if (isShown) {
              window.history.replaceState(
                null,
                "",
                `${window.location.pathname}?property_id=${id}`
              );
            }
          }
        }
      }
    }
  }, [isShown]);

  if (!isShown) return null;

  const hideModal = (e: any) => {
    e.stopPropagation();
    hide();
  };

  return (
    <div
      onClick={hideModal}
      className="fixed top-0 left-0 right-0 bottom-0 h-screen bg-black/60 flex items-center justify-center z-20"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${className} bg-gray-100 mx-4 p-4 rounded-xl ${
          height ? height : "h-[95vh]"
        } max-h-[98vh]`}
      >
        <header className="flex justify-between items center border-b border-gray-200 py-3">
          <p className="text-2xl font-bold text-gray-800 px-3">{header}</p>

          <div
            onClick={hide}
            className="bg-gray-300 hover:bg-gray-500 cursor-pointer hover:text-gray-300 font-sans text-gray-500 w-8 h-8 flex items-center justify-center rounded-full"
          >
            <MdOutlineCancel />
          </div>
        </header>
        <div className="h-[90%]"> {children}</div>
      </div>
    </div>
  );
};

export default Modal;
