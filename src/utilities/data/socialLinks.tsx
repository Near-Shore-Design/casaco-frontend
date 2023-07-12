import { ReactNode } from "react";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import { BsFacebook } from "react-icons/bs";

export const socialLinks: Array<{ icon: ReactNode; to: string }> = [
  { icon: <AiFillTwitterCircle color="#3f51b5" size={25} />, to: "" },
  { icon: <BsFacebook color="#3f51b5" size={25} />, to: "" },
  { icon: <AiFillInstagram color="#3f51b5" size={25} />, to: "" },
];
