import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/atoms/Button";
import InputField from "components/atoms/InputField";
import Footer from "components/molecules/Footer";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { RootState } from "store";
import { forgotPasswordSchema } from "utilities/Schema/forgotpasswordSchema";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { userForgotPassword } from "utilities/reduxSlices/authSlice";

type Inputs = {
  email: string;
};
const ForgotPassword = () => {
  const { isLoading } = useAppSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const onSubmit = (data: Inputs) => {
    const dataField = {
      email: data.email,
    };
    dispatch(userForgotPassword(dataField)).then((data) => {
      if (data.payload === "Email sent successfully") {
        toast.success("Password reset instructions sent successfully");
      } else {
        toast.error("User not found!");
      }
    });
    reset();
  };

  return (
    <>
      {" "}
      <div className="min-h-screen dark:bg-dark bg-gray-100 flex flex-col justify-center sm:py-12 lg:py-20">
        <div className="py-10 px-5 mb-3 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">
            Forgot password
          </h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-7">
              <p className="py-4 text-lg text-center text-gray-700">
                No worries, we'll send you reset instruction.
              </p>
              <InputField
                register={register}
                label="Email"
                id="email"
                name="email"
                type="email"
                error={errors.email?.message}
              />
              <Button
                type="submit"
                text={
                  isLoading ? (
                    <PacmanLoader color="#fff" size={5} />
                  ) : (
                    "Send recovery link"
                  )
                }
                disabled={!formState.isValid}
                className="w-full justify-center mt-5"
              />
              <div
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 justify-center mt-3 hover:text-charcoal cursor-pointer"
              >
                <AiOutlineArrowLeft />
                <p> Return to login</p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
