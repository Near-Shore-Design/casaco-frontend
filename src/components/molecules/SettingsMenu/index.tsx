import React from "react";
import { AiFillSetting, AiOutlineLogout } from "react-icons/ai";
import { SettingsMenuProp } from "./types";
import { userLogout } from "utilities/reduxSlices/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { persistor } from "store";

const SettingsMenu: React.FC<SettingsMenuProp> = ({
  showSettings,
  closeMenu,
}) => {
  const { token } = useAppSelector(
    (state: { auth: { token: { [key: string]: string } } }) => state.auth
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logOutUser = () => {
    const logoutData = { refresh: token.refresh_token };
    closeMenu();
    dispatch(userLogout(logoutData));
    persistor.purge();
    navigate("/login");
  };

  const goToUserSettings = () => {
    closeMenu();
    navigate("/profile-settings");
  };
  return (
    <div className="absolute bottom-[-105px] left-[-130px] dark:text-dark z-20">
      <div
        className={`${
          !showSettings ? "h-0 overflow-hidden duration-300" : ""
        } bg-white w-fit rounded transition-all `}
      >
        <div
          onClick={goToUserSettings}
          className="flex items-center cursor-pointer p-3 gap-2 border-b border-platinum hover:bg-violet-blue hover:text-white"
        >
          <span>
            <AiFillSetting />
          </span>
          Profile Settings
        </div>
        <div
          onClick={logOutUser}
          className="flex items-center cursor-pointer p-3 gap-2 hover:bg-violet-blue hover:text-white"
        >
          <span>
            <AiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
