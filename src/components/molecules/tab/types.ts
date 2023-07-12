import { ReactNode } from "react";

export interface TabProps {
  tabs: Array<{ title: string; component: ReactNode }>;
  styles?: string;
  componentClass?: string;
  buttonsStyles?: string;
}
