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
const GoogleSigninWithoutRedirect: React.FC<googleSignInprop> = ({
  id,
  onClose,
}) => {
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
                dispatch(getAllProperties()).then(() => {
                  toast.success("Logged in Sucessfully!");
                });
              } else {
                return;
              }
            });
            onClose();
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleSigninWithoutRedirect;
