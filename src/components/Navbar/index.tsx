import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import logo from "assets/images/logo.png";
import Switch from "components/atoms/Switch";
import HamburgerMenu from "../molecules/HamburgerMenu";
import { useAppSelector } from "utilities/hooks";
import { navbarRoutes } from "utilities/data/NavbabrRoutes";
import { useScreenWidth, useTheme } from "utilities/helper-functions";
import LoggedInComponents from "./NavbarComponents/LoggedInComponents";
import LoggedOutComponents from "./NavbarComponents/LoggedOutComponents";

const Navbar = () => {
  const { token } = useAppSelector(
    (state: { auth: { token: { [key: string]: string } } }) => state.auth
  );
  const navRef = useRef<null | HTMLDivElement>(null);
  const isLogin = token?.access_token;
  const [theme, setTheme] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const toggleMenu = () => {
    setOpen((open) => !open);
  };
  const toggleSettingsMenu = () => {
    setShowSettings((prev) => !prev);
  };
  const handleClick = () => setTheme((prev) => !prev);

  useTheme(theme);
  const screenWidth = useScreenWidth();

  useEffect(() => {
    // Add event listener to the document object
    document.addEventListener("mousedown", handleClickOutside);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleClickOutside(event: any) {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setShowSettings(false);
    }
  }

  return (
    <div className=" md:fixed top-0 z-10 bg-charcoal dark:bg-charcoal w-full py-4 px-8">
      <nav ref={navRef} className="border-gray-200 px-2">
        <div className="flex flex-wrap items-end justify-between">
          <Link to="/" className="w-[25%] lg:w-[10%]">
            <img src={logo} alt="" className="w-[100%]" />
          </Link>
          <div className="hidden lg:flex flex-1 ml-10 items-center gap-5 text-xl">
            {navbarRoutes?.map(({ title, to }, idx) => (
              <NavLink
                key={idx}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "active"
                    : "cursor-pointer text-white hover:text-[#D3AC2B] text-xl"
                }
              >
                {title}
              </NavLink>
            ))}
          </div>
          <div className="flex items-center md:order-2">
            {screenWidth > 370 && (
              <Switch onClick={handleClick} text={theme ? "Dark" : "Light"} />
            )}

            {!isLogin && <LoggedOutComponents />}
            {isLogin && (
              <LoggedInComponents
                showSettings={showSettings}
                closeMenu={() => setShowSettings(false)}
                toggleSettingsMenu={toggleSettingsMenu}
              />
            )}
            <div className="mt-1 lg:hidden ml-3" onClick={toggleMenu}>
              {open ? (
                <AiOutlineClose color="#D3AC2B" size={20} />
              ) : (
                <AiOutlineMenu color="#D3AC2B" size={20} />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile screen Hamburger Menu */}

      <HamburgerMenu
        isLoggedIn={isLogin}
        open={open}
        closeMenu={() => setOpen(false)}
      />
    </div>
  );
};

export default Navbar;
