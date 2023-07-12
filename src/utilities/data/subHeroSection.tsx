import React from "react";
import { GoLocation } from "react-icons/go";
import { FaGem } from "react-icons/fa";
import { GrGrow } from "react-icons/gr";

export const subHero: Array<{
  icon: React.ReactNode;
  text: string;
  subText: string;
}> = [
  {
    icon: <GoLocation size={80} />,
    text: "Buy in your dream location",
    subText: "...or sell your home and start your next adventure.",
  },
  {
    icon: <FaGem color="#D3AC2B" size={80} />,
    text: "Find the hidden gem",
    subText:
      "Use our tools to find properties that the rest of the world overlooks,",
  },
  {
    icon: <GrGrow size={80} />,
    text: "Grow your portfolio",
    subText: "Monitor trends to see where to invest next",
  },
];
