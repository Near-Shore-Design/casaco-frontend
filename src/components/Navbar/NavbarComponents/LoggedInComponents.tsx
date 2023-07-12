import Button from "components/atoms/Button";
import SettingsMenu from "components/molecules/SettingsMenu";
import React from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { RootState } from "store";
import { nameAbbr } from "utilities/helper-functions";
import { useAppSelector } from "utilities/hooks";

interface loggedInProp {
  showSettings: boolean;
  toggleSettingsMenu: () => void;
  closeMenu: () => void;
}
const LoggedInComponents: React.FC<loggedInProp> = ({
  showSettings,
  toggleSettingsMenu,
  closeMenu,
}) => {
  const navigate = useNavigate();
  const { userData } = useAppSelector((state: RootState) => state.auth);

  const { first_name, last_name, email } = userData;
  const fullName = `${first_name} ${last_name}`;

  const nameInitials = nameAbbr(fullName);

  return (
    <div className="hidden lg:flex">
      <Button
        className="mx-3 text-3xl font-medium"
        text="My Dashboard"
        type="button"
        onClick={() => navigate("/dashboard")}
      />
      <div
        onClick={toggleSettingsMenu}
        className="relative flex gap-1 items-center cursor-pointer"
      >
        <p className=" w-[40px] h-[40px] text-white font-semibold flex justify-center items-center bg-violet-blue p-3 rounded-full">
          {nameInitials}
        </p>
        <AiFillCaretDown color="#fff" />
        <SettingsMenu showSettings={showSettings} closeMenu={closeMenu} />
      </div>
    </div>
  );
};

export default LoggedInComponents;
