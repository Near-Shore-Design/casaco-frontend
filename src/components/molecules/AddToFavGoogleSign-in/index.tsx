import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
  addToFavorite,
  getAllProperties,
} from "utilities/reduxSlices/HomePropertySlice";
import { signWithGoogle } from "utilities/reduxSlices/authSlice";

interface googleSignInprop {
  id: number;
  onClose: () => void;
}
const FavoriteGoogleSignIn: React.FC<googleSignInprop> = ({ id, onClose }) => {
  const dispatch = useDispatch<any>();
  const clientID = import.meta.env.VITE_CLIENT_ID;

  return (
    <div>
      <GoogleOAuthProvider clientId={clientID}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            dispatch(
              signWithGoogle({ token: credentialResponse.credential })
            ).then((data: any) => {
              if (data?.payload) {
                const userID = data?.payload?.user?.user_id;
                toast.success("Logged in sucessfully!");
                dispatch(
                  addToFavorite({
                    user_id: userID,
                    property_id: id,
                  })
                ).then(() => {
                  dispatch(getAllProperties());
                  toast.success("Added to favorites!");
                });
              } else {
                return;
              }
            });
            onClose();
          }}
          onError={() => {
            console.log("Login Failed!");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default FavoriteGoogleSignIn;
