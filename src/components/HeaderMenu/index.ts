import { BoxProps } from "grommet";
import template from "./template";

export interface IItem {
  icon?: string;
  label: string;
  onClick?: (...args: any[]) => void;
}

export interface IProps {
  active?: boolean;
  id?: string;
  items: IItem[];
  label: string;
  margin?: BoxProps["margin"];
  open?: boolean;
}

export default template;
