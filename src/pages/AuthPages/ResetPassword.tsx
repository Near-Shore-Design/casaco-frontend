import { yupResolver } from "@hookform/resolvers/yup";

import Button from "components/atoms/Button";
import InputField from "components/atoms/InputField";
import NotFoundPage from "components/molecules/404Page";
import Footer from "components/molecules/Footer";
import LoadingScreen from "components/molecules/LoadingScreen";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { PacmanLoader } from "react-spinners";
import { RootState } from "store";
import { resetPasswordSchema } from "utilities/Schema/resetPass";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import {
  clearResetParams,
  getResetParams,
  getUidValidation,
  userResetPassword,
} from "utilities/reduxSlices/authSlice";

type Inputs = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const { isLoading, params } = useAppSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const listener = useRef(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    formState,
    reset,
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(resetPasswordSchema),
  });
  const [showComponent, setShowComponent] = useState<boolean>(false);
  const [screenLoading, setscreenLoading] = useState<boolean>(true);
  const onSubmit = (data: Inputs) => {
    const resetData = {
      password: data.password,
      new_password: data.confirmPassword,
    };
    dispatch(
      userResetPassword({ body: resetData, uid: params[0], token: params[1] })
    ).then((data) => {
      if (data.payload === "Password Updated") {
        toast.success("Password updated!");
        navigate("/login");
      } else {
        toast.error(data.payload);
      }
    });
    reset();
  };

  useEffect(() => {
    if (listener.current) {
      listener.current = false;
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.search);
      const fields = Object.fromEntries(searchParams.entries());
      const keys = Object.keys(fields);

      dispatch(
        getUidValidation({
          uid: keys[0],
          token: keys[1],
        })
      ).then((data: any) => {
        if (data?.payload === "Request failed with status code 400") {
          setShowComponent(false);
        } else {
          dispatch(getResetParams(keys));
          setShowComponent(true);
        }
        setscreenLoading(false);
      });
    }
    const timer = setTimeout(() => {}, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (screenLoading) return <LoadingScreen />;
  return (
    <>
      <div className="min-h-screen dark:bg-dark bg-gray-100 flex flex-col justify-center sm:py-12 lg:py-20">
        {showComponent && (
          <div className="py-10 px-5 mb-3 xs:p-0 mx-auto md:w-full md:max-w-md">
            <h1 className="font-bold text-center text-2xl mb-5">
              Reset password
            </h1>
            <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
              <form onSubmit={handleSubmit(onSubmit)} className="px-5 py-7">
                <h1 className="py-4 text-2xl font-bold text-center text-gray-700">
                  Create a new password
                </h1>
                <p>
                  Your new password should be different from the old password
                  used.{" "}
                </p>
                <InputField
                  register={register}
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  error={errors.password?.message}
                />
                <InputField
                  register={register}
                  label="Confirm password"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  error={errors.confirmPassword?.message}
                />
                <Button
                  type="submit"
                  disabled={!formState.isValid}
                  text={
                    isLoading ? (
                      <PacmanLoader color="#fff" size={5} />
                    ) : (
                      "Reset Password"
                    )
                  }
                  className="w-full justify-center mt-5"
                />
              </form>
            </div>
          </div>
        )}
        {!showComponent && <NotFoundPage />}
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
