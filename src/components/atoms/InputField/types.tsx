import { ReactNode } from "react";
import { UseFormRegister } from "react-hook-form";

export interface InputProps {
  label?: ReactNode;
  type: string;
  name: string;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  addedIcon?: boolean;
  addedIconFunc?: () => void;
  id?: string;
  ref?: any;
  onChange?: (x: any) => void;
  register: UseFormRegister<any>;
  containerStyles?: string;
  styles?: string;
}
