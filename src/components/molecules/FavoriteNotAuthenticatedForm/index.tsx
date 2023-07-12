import InputField from "components/atoms/InputField";
import { useForm } from "react-hook-form";
import { authSchema } from "utilities/Schema/authSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "components/atoms/Button";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { userLogin } from "utilities/reduxSlices/authSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import GoogleSigninWithoutRedirect from "../GoogleSigninWithoutRedirect";
import { RootState } from "store";
import { PacmanLoader } from "react-spinners";
import {
  addToFavorite,
  getAllProperties,
} from "utilities/reduxSlices/HomePropertySlice";

type Inputs = {
  email: string;
  password: string;
};

interface notAuthenticatedForm {
  onClose: () => void;
}

const FavoriteNotAuthenticated: React.FC<notAuthenticatedForm> = ({
  onClose,
}) => {
  const { isLoading } = useAppSelector((state: RootState) => state.auth);
  const { propertyFavoriteID } = useAppSelector(
    (state: RootState) => state.home
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
    resolver: yupResolver(authSchema),
  });
  const onSubmit = (data: Inputs) => {
    dispatch(userLogin(data)).then((data: any) => {
      if (data?.payload) {
        const userID = data?.payload?.user?.user_id;
        dispatch(
          addToFavorite({ user_id: userID, property_id: propertyFavoriteID })
        ).then(() => {
          dispatch(getAllProperties());
          toast.success("Added to favorites");
        });
      } else {
        return;
      }
      onClose();
    });
  };

  return (
    <div className="h-fit">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          register={register}
          name="email"
          type="text"
          id="email"
          label="Email"
          error={errors.email?.message}
        />
        <InputField
          register={register}
          name="password"
          type="text"
          id="password"
          label="Password"
          error={errors.password?.message}
        />
        <Button
          text={isLoading ? <PacmanLoader color="#fff" size={5} /> : "Login"}
          type="submit"
          className="my-3 w-full flex justify-center"
        />
        <p className="m-0 text-sm">
          Do not have an account?{" "}
          <span
            onClick={() => navigate("/registration")}
            className="hover:underline text-violet-blue hover:text-dark"
          >
            Register
          </span>
        </p>
      </form>
      <p className="text-center text-sm mt-4">
        By submitting, I accept Casa's{" "}
        <span className="underline text-violet-blue hover:text-black">
          terms of use
        </span>
        .
      </p>
      <div className="w-full h-[1px] border-black/25 border my-4" />
      <p className=" text-center"> Or connect with :</p>
      <div className="flex justify-center gap-4 my-2">
        <GoogleSigninWithoutRedirect
          id={propertyFavoriteID}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default FavoriteNotAuthenticated;
