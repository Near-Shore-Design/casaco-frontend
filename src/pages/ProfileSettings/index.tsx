import Card from "components/atoms/Card";
import Myprofile from "./sections/Myprofile";
import Security from "./sections/Security";
import { Link } from "react-router-dom";
import { useAppSelector } from "utilities/hooks";
import { RootState } from "store";
import { PulseLoader } from "react-spinners";
import profilePlaceholder from "assets/images/profileImg.png";
import Footer from "components/molecules/Footer";

const ProfileSettings = () => {
  const { userData, isLoading } = useAppSelector(
    (state: RootState) => state.auth
  );

  const { first_name, last_name, email, image_url } = userData;
  const fullName = `${first_name} ${last_name}`;
  const trimmedString = image_url?.substring(2, image_url?.length - 2);
  const imageUrl = trimmedString?.trim();

  return (
    <>
      <div className="p-4 pb-10 pt-2 lg:pt-[7rem]">
        <h1 className="text-sm lg:text-xl font-bold text-violet-blue">
          Profile Settings
        </h1>

        {isLoading && (
          <div className="flex justify-center">
            <PulseLoader size={15} />
          </div>
        )}
        <Card
          header="My Profile"
          className=" flex justify-between items-center"
        >
          <Myprofile
            username={fullName}
            email={email}
            src={imageUrl ? imageUrl : profilePlaceholder}
          />
        </Card>

        <Card header="Sign in & Security">
          <Security />
        </Card>

        <Link
          className="mx-2 hover:border-b border-gray-700"
          to="/privacy-policy"
        >
          Privacy Policy
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default ProfileSettings;
