import { PropsValue } from "react-select";

export interface OptionType {
  value: string;
  label: string;
}

export interface selectProp {
  options: Array<{ value: string; label: string }>;
  value?: PropsValue<OptionType> | undefined;
  placeholder?: string;
  onChange: (x: any) => void;
  isMulti?: any;
}
