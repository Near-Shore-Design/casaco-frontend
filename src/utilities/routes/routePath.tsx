import { Outlet } from "react-router-dom";
import LandingPage from "pages/landingPage";
import { privateProp, publicProp } from "./types";
import Login from "pages/AuthPages/Login";
import Registration from "pages/AuthPages/Registration";
import BuyPage from "pages/BuyPage";
import Dashboard from "pages/Dashboard";
import Test from "pages/Test";
import SellPage from "pages/SellPage";
import ProfileSettings from "pages/ProfileSettings";
import RentPage from "pages/RentPage";
import ForgotPassword from "pages/AuthPages/ForgotPassword";
import ResetPassword from "pages/AuthPages/ResetPassword";
import NotFoundPage from "components/molecules/404Page";
import PrivacyPolicy from "pages/PrivacyPolicy";

export const privateRoutes: Array<privateProp> = [
  {
    path: "dashboard/*",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
    ],
  },

  {
    path: "/profile-settings",
    element: <ProfileSettings />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export const publicRoutes: Array<publicProp> = [
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/buy-house",
    element: <BuyPage />,
  },
  {
    path: "/sell-house",
    element: <SellPage />,
  },
  {
    path: "/rent-house",
    element: <RentPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/test",
    element: <Test />,
  },
];
