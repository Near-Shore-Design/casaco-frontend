import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "components/atoms/InputField";
import { BsArrowRight } from "react-icons/bs";
import Button from "components/atoms/Button";
import { userLogin, userRegister } from "utilities/reduxSlices/authSlice";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "utilities/Schema/registrationSchma";
import PacmanLoader from "react-spinners/PacmanLoader";
import { RootState } from "store";
import { toast } from "react-hot-toast";
import AuthFooter from "components/molecules/AuthFooter";
import GoogleSignIn from "components/molecules/GoogleSign-in";
import Footer from "components/molecules/Footer";

type Inputs = {
  password: string;
  email: string;
  confirmPassword: string;
  first_name: string;
  last_name: string;
};

const Registration = () => {
  const { isLoading } = useAppSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(registrationSchema),
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (data: Inputs) => {
    const email = data.email;
    const password = data.password;
    dispatch(userRegister(data)).then((data) => {
      const checkValidation = data?.payload?.message;
      if (checkValidation) {
        toast.success("Registration Successful");
        dispatch(userLogin({ email, password })).then((data: any) => {
          if (data?.payload) {
            navigate("/dashboard");
          } else {
            navigate("/login");
          }
        });
      } else {
        return;
      }
    });
  };

  return (
    <>
      <div className="min-h-screen dark:bg-dark bg-gray-100 flex flex-col justify-center sm:py-12 lg:py-20">
        <div className="py-10 pt-[100px] px-5 mb-3 md:p-10 xs:p-0 md:mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">
            Get yourself an account
          </h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-7">
              <InputField
                register={register}
                label="First Name"
                id="first_name"
                name="first_name"
                type="first_name"
                error={errors.first_name?.message}
              />

              <InputField
                register={register}
                label="Last Name"
                id="last_name"
                name="last_name"
                type="last_name"
                error={errors.last_name?.message}
              />

              <InputField
                register={register}
                label="Email"
                id="email"
                name="email"
                type="email"
                error={errors.email?.message}
              />

              <InputField
                register={register}
                label="Password"
                name="password"
                type="password"
                error={errors.password?.message}
              />

              <InputField
                register={register}
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                error={errors.confirmPassword?.message}
              />
              <Button
                type="submit"
                text={
                  isLoading ? (
                    <PacmanLoader color="#fff" size={5} />
                  ) : (
                    "Register"
                  )
                }
                className="w-full justify-center mt-5"
                disabled={!formState.isValid}
                iconFront={!isLoading && <BsArrowRight />}
              />
            </form>
            <div className="p-5">
              <GoogleSignIn />
            </div>
            <AuthFooter />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Registration;
