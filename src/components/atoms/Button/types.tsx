import { ReactNode } from "react";

export interface ButtonProps {
  disabled?: boolean;
  className?: string;
  light?: boolean;
  text: ReactNode;
  pill?: boolean;
  type: "submit" | "reset" | "button" | undefined;
  loading?: string;
  iconBack?: ReactNode;
  iconFront?: ReactNode;
  onClick?: () => void;
}
