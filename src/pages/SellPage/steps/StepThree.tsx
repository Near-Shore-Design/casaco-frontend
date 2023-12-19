import ErrorMessage from "components/atoms/ErrorMessage";
import MapWithDraggableMarker from "components/molecules/MapWithDraggableMarker";
import { UseFormRegister } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { useAppDispatch } from "utilities/hooks";
import {
  updateRemovedImageBlob,
  updateRemovedImageIndex,
} from "utilities/reduxSlices/sellPropertySlice";

interface stepThreeProp {
  register: UseFormRegister<any>;
  errors: any;
  handleFileChange: (x: any) => void;
  imageRef: any;
  imageFile: Array<any>;
  sizeError: boolean;
  imageValidation: boolean;
  removeImagePreview?: (x: any) => void;
  imagePreview: Array<any>;
}

const StepThree: React.FC<stepThreeProp> = ({
  register,
  handleFileChange,
  imageRef,
  imageFile,
  sizeError,
  imageValidation,
  imagePreview,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="flex justify-between items-center ">
        <input
          type="file"
          id="file-input"
          {...register("image")}
          accept="image/*"
          multiple
          ref={imageRef}
          className="py-3 hidden"
          onChange={handleFileChange}
          onClick={(e) => {
            const inputElement = e.target as HTMLInputElement;
            inputElement.value = "";
          }}
        />
        <label
          htmlFor="file-input"
          className="custom-file-input mt-5 mb-2 hover: cursor-pointer rounded bg-violet-blue text-white flex items-center gap-2 text-sm py-2  px-6 hover:scale-95 duration-200 font-medium w-full justify-center"
        >
          Choose Property Images
        </label>
      </div>
      {imageValidation && <ErrorMessage field="Add a property image" />}
      {sizeError && <ErrorMessage field="Select file up to 5MB" />}
      {imagePreview.length > 0 && (
        <div className="flex w-full overflow-auto gap-3 ">
          {imagePreview.map((prev, index) => (
            <div className="w-full">
              <MdCancel
                key={index + "cancel"}
                className="cursor-pointer hover:rotate-180 duration-500 float-right"
                size={18}
                onClick={() => {
                  dispatch(updateRemovedImageBlob(prev));
                  dispatch(updateRemovedImageIndex(index));
                }}
              />
              <img
                key={index}
                src={prev}
                alt="property"
                className="h-[80%] w-[100%]"
              />
              {imageFile[index]?.name}
            </div>
          ))}
        </div>
      )}
      <MapWithDraggableMarker />
    </div>
  );
};

export default StepThree;
