import InputField from "components/atoms/InputField";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { AiOutlineUnlock } from "react-icons/ai";
import PacmanLoader from "react-spinners/PacmanLoader";
import Button from "components/atoms/Button";
import { useForm } from "react-hook-form";
import { userLogin } from "utilities/reduxSlices/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "utilities/Schema/loginSchema";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { RootState } from "store";
import AuthFooter from "components/molecules/AuthFooter";
import GoogleSignIn from "components/molecules/GoogleSign-in";
import Footer from "components/molecules/Footer";

type Inputs = {
  password: string;
  email: string;
};
const Login = () => {
  const { isLoading } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });
  const navigate = useNavigate();
  const onSubmit = (data: Inputs) => {
    dispatch(userLogin(data)).then((data: any) => {
      if (data?.payload) {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    });
  };
  return (
    <>
      <div className="min-h-screen dark:bg-dark bg-gray-100 flex flex-col justify-center sm:py-12 lg:py-20">
        <div className="py-10 px-5 mb-3 xs:p-0 md:mx-auto md:w-full md:max-w-md">
          <h1 className="font-bold text-center text-2xl mb-5">Welcome Back</h1>
          <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
            <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-7">
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
                id="password"
                name="password"
                type="password"
                error={errors.password?.message}
              />
              <Button
                type="submit"
                text={
                  isLoading ? <PacmanLoader color="#fff" size={5} /> : "Login"
                }
                className="w-full justify-center mt-5"
                iconFront={!isLoading && <BsArrowRight />}
              />
              <div
                onClick={() => navigate("/forgot-password")}
                className="w-fit flex items-center justify-start transition duration-200  py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500"
              >
                <AiOutlineUnlock color="#3f51b5" />
                <span className="inline-block ml-1">Forgot Password</span>
              </div>
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

export default Login;
