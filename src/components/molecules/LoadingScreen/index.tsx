import { BounceLoader } from "react-spinners";

const LoadingScreen = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <BounceLoader size={60} color="#000" />
    </div>
  );
};

export default LoadingScreen;
