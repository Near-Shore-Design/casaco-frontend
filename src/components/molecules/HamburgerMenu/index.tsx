import Button from "components/atoms/Button";
import { useNavigate } from "react-router";
import { hamburgerProp } from "./types";
import { navbarRoutes } from "utilities/data/NavbabrRoutes";
import { NavLink } from "react-router-dom";
import { useScreenWidth, useTheme } from "utilities/helper-functions";
import Switch from "components/atoms/Switch";
import { useState } from "react";
import { userLogout } from "utilities/reduxSlices/authSlice";
import { useAppDispatch, useAppSelector } from "utilities/hooks";
import { persistor } from "store";

const HamburgerMenu: React.FC<hamburgerProp> = ({
  isLoggedIn,
  open,
  closeMenu,
}) => {
  const showMenuBar = "-translate-x-[70%] duration-200";
  const closeMenuBar = "-translate-x-[200%] duration-200";
  const [theme, setTheme] = useState<boolean>(false);
  const handleClick = () => setTheme((prev) => !prev);
  const { token } = useAppSelector(
    (state: { auth: { token: { [key: string]: string } } }) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const profileSettings = () => {
    closeMenu();
    navigate("/profile-settings");
  };

  const logOutUser = () => {
    const logoutData = { refresh: token.refresh_token };
    dispatch(userLogout(logoutData)).then(() => {
      closeMenu();
    });
    persistor.purge();
    navigate("/login");
  };

  const screenWidth = useScreenWidth();
  useTheme(theme);
  return (
    <div
      className={`${
        open ? showMenuBar : closeMenuBar
      } flex flex-col p-5 fixed h-screen w-[60%] top-0 right-0 bg-black z-[12] lg:hidden `}
    >
      {navbarRoutes?.map(({ title, to }, idx) => (
        <NavLink
          key={idx}
          to={to}
          onClick={closeMenu}
          className={({ isActive }) =>
            isActive
              ? "active-mobile"
              : "cursor-pointer text-white hover:text-[#D3AC2B] border-b border-platinum mb-2 py-2"
          }
        >
          {title}
        </NavLink>
      ))}

      {!isLoggedIn && (
        <div className="w-full flex flex-col gap-4 justify-center items-center mt-2">
          <Button
            type="button"
            onClick={() => {
              closeMenu();
              navigate("/registration");
            }}
            text="SIGN UP"
            light
            className="w-full flex justify-center text-sm"
          />
          <Button
            type="button"
            onClick={() => {
              closeMenu();
              navigate("/login");
            }}
            text="SIGN IN"
            className="w-full flex justify-center text-sm"
          />
        </div>
      )}

      {isLoggedIn && (
        <div className=" flex flex-col">
          <div
            onClick={profileSettings}
            className="cursor-pointer text-white hover:text-[#D3AC2B] border-b border-platinum mb-2 py-2"
          >
            PROFILE SETTINGS
          </div>
          <div
            onClick={logOutUser}
            className="cursor-pointer text-white hover:text-[#D3AC2B] border-b border-platinum mb-2 py-2"
          >
            Logout
          </div>

          <Button
            className="mx-3 my-3"
            text="My Dashboard"
            type="button"
            onClick={() => navigate("/dashboard")}
          />
        </div>
      )}
      {screenWidth <= 369 && (
        <div className="mt-4">
          <Switch onClick={handleClick} text={theme ? "Dark" : "Light"} />
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
