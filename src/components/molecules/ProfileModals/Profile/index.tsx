import Button from "components/atoms/Button";
import ErrorMessage from "components/atoms/ErrorMessage";
import InputField from "components/atoms/InputField";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdCancel } from "react-icons/md";
import { RootState } from "store";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { userDataUpdate } from "utilities/reduxSlices/authSlice";

type Inputs = {
  first_name: string;
  last_name: string;
};

interface profileProp {
  onClose: () => void;
  src?: string;
}

const ProfileModalComponents: React.FC<profileProp> = ({ onClose, src }) => {
  const { userData } = useAppSelector((state: RootState) => state.auth);
  const [imageFile, setImageFile] = useState<any>(null);
  const [imagePreview, setImageFilePreview] = useState<any>(src);
  const [sizeError, setSizeError] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { register, handleSubmit, formState } = useForm<Inputs>({
    defaultValues: {
      first_name: userData.first_name,
      last_name: userData.last_name,
    },
  });

  const handleFileChange = (e: any) => {
    const maxSizeInBytes = 1024 * 1024;
    e.preventDefault();
    const file = e.target.files[0];
    const fileSizeInBytes = file.size;
    if (file) {
      if (fileSizeInBytes > maxSizeInBytes) {
        if (imageRef.current) {
          imageRef.current.value = "";
        }
        setSizeError(true);
      } else {
        setSizeError(false);
        setImageFile(file);
        const newImagePreview = URL.createObjectURL(e.target.files[0]);
        setImageFilePreview(newImagePreview);
      }
    }
  };
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleClearImage = () => {
    setImageFilePreview(src);
    setImageFile(null);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  };
  const onSubmit = (data: Inputs) => {
    const formData = new FormData();
    formData.append("first_name", String(data.first_name));
    formData.append("last_name", String(data.last_name));
    {
      imageFile && formData.append("image1", imageFile, "profile_img.jpg");
    }

    dispatch(userDataUpdate({ body: formData, id: userData?.user_id }));
  };

  return (
    <div className="max-w-[450px] w-full lg:w-[450px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center gap-3 py-4">
          <img
            src={imagePreview || imageFile}
            alt="profile-img"
            className="w-[80px] h-[80px] rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <input
              ref={imageRef}
              type="file"
              id="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            {sizeError && <ErrorMessage field="Select file less than 1MB" />}
          </div>
          {imageFile !== null && <MdCancel onClick={handleClearImage} />}
        </div>
        <InputField
          name="first_name"
          id="first_name"
          label="First name"
          type="text"
          register={register}
        />
        <InputField
          name="last_name"
          id="last_name"
          label="Last name"
          type="text"
          register={register}
        />
        <div className="flex justify-end border-t border-gray-400 mt-3 py-3">
          <div className="flex gap-3">
            <Button onClick={onClose} type="button" text="Cancel" />
            <Button type="submit" text="Update" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileModalComponents;
