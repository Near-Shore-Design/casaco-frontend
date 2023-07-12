import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/atoms/Button";
import InputField from "components/atoms/InputField";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { RootState } from "store";
import { changeEmailSchema } from "utilities/Schema/changeEmailSchema";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { userDataUpdate } from "utilities/reduxSlices/authSlice";

type Inputs = {
  email: string;
};
interface changeEmailProp {
  onClose: () => void;
}
const ChangeEmailModalComponent: React.FC<changeEmailProp> = ({ onClose }) => {
  const { userData } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(changeEmailSchema),
  });
  const onSubmit = (data: Inputs) => {
    dispatch(userDataUpdate({ body: data, id: userData.user_id })).then(
      (data: any) => {
        if (data?.payload === "Request failed with status code 400") {
          toast.error("New email already exist");
        } else {
          onClose();
        }
      }
    );
  };

  return (
    <div className="p-4 w-full lg:w-[450px] ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>You can change your Email address !</h1>

        <InputField
          type="text"
          label="New Email"
          id="email"
          register={register}
          name="email"
          error={errors.email?.message}
        />
        <div className="flex justify-end border-t border-gray-400 mt-3 py-3">
          <div className="flex gap-3">
            <Button onClick={onClose} type="button" text="Cancel" />
            <Button type="submit" text="Apply" disabled={!formState.isValid} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangeEmailModalComponent;
