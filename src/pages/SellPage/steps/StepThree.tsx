import ErrorMessage from "components/atoms/ErrorMessage";
import MapWithDraggableMarker from "components/molecules/MapWithDraggableMarker";
import { UseFormRegister } from "react-hook-form";
import { MdCancel } from "react-icons/md";

interface stepThreeProp {
  register: UseFormRegister<any>;
  errors: any;
  handleFileChange: (x: any) => void;
  imageRef: any;
  imageFile: Array<any>;
  sizeError: boolean;
  imageValidation: boolean;
  removeImagePreview: (x: any) => void;
  imagePreview: Array<any>;
}

const StepThree: React.FC<stepThreeProp> = ({
  register,
  errors,
  handleFileChange,
  imageRef,
  imageFile,
  sizeError,
  imageValidation,
  removeImagePreview,
  imagePreview,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center ">
        <input
          type="file"
          id="file"
          {...register("image")}
          accept="image/*"
          multiple
          ref={imageRef}
          className="py-3 "
          onChange={handleFileChange}
        />
        {imageFile.length > 0 && (
          <MdCancel
            className="cursor-pointer hover:rotate-180 duration-500"
            size={18}
            onClick={removeImagePreview}
          />
        )}
      </div>
      {imageValidation && <ErrorMessage field="Add a property image" />}
      {sizeError && <ErrorMessage field="Select file up to 5MB" />}
      {imageFile.length > 0 && (
        <div className="flex w-full overflow-auto gap-3 ">
          {imagePreview.map((prev, index) => (
            <img
              key={index}
              src={prev}
              alt="property"
              className="py-4 h-[40%]"
            />
          ))}
        </div>
      )}

      <MapWithDraggableMarker />
    </div>
  );
};

export default StepThree;
