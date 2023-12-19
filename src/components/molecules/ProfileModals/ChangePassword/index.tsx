import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/atoms/Button";
import InputField from "components/atoms/InputField";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { changePassSchema } from "utilities/Schema/changePasswordSchema";
import { useAppDispatch } from "utilities/hooks";
import { passwordChange } from "utilities/reduxSlices/authSlice";

type Inputs = {
  old_password: string;
  new_password: string;
};
interface changePasswordProp {
  onClose: () => void;
}
const ChangePasswordModalComponent: React.FC<changePasswordProp> = ({
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(changePassSchema),
  });
  const onSubmit = (data: Inputs) => {
    dispatch(passwordChange(data)).then((data: any) => {
      if (data?.payload === "Request failed with status code 400") {
        toast.error("Old password incorrect!");
      } else {
        onClose();
      }
    });
  };

  return (
    <div className="p-4 w-full lg:w-[450px] ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>You can change your old password to a new one!</h1>
        <InputField
          type="password"
          id="old_Password"
          label="Old password"
          register={register}
          name="old_password"
          error={errors.old_password?.message}
        />
        <InputField
          type="password"
          label="New password"
          id="new_password"
          register={register}
          name="new_password"
          error={errors.new_password?.message}
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

export default ChangePasswordModalComponent;
