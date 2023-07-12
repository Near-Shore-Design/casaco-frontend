import Button from "components/atoms/Button";
import { useNavigate } from "react-router-dom";

const LoggedOutComponents = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="hidden lg:flex">
        <Button
          type="button"
          onClick={() => navigate("/registration")}
          text="REGISTER"
          light
          className="ml-5 shadow-lg"
        />
        <Button
          type="button"
          onClick={() => navigate("/login")}
          text="SIGN IN"
          className="ml-5 shadow-lg"
        />
      </div>
    </div>
  );
};

export default LoggedOutComponents;
