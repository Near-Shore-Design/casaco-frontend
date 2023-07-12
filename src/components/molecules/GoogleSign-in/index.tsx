import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signWithGoogle } from "utilities/reduxSlices/authSlice";

const GoogleSignIn = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const clientID = import.meta.env.VITE_CLIENT_ID;

  return (
    <div>
      <GoogleOAuthProvider clientId={clientID}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            dispatch(
              signWithGoogle({ token: credentialResponse.credential })
            ).then(() => {
              navigate("/dashboard");
            });
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleSignIn;
