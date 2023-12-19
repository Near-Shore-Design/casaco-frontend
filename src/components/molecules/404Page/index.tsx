import Button from "components/atoms/Button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-[10rem] font-extrabold text-violet-blue">Oops!</h1>
      <h2 className="text-[2rem] font-semibold">404 - PAGE NOT FOUND</h2>
      <p className="text-2xl max-w-[650px] text-center py-4">
        The page you are looking for might have been removed or is temporarily
        unavailable.
      </p>
      <Button text="Back to home" type="button" onClick={() => navigate("/")} />
    </div>
  );
};

export default NotFoundPage;
