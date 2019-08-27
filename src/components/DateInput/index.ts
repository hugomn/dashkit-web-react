import { Dispatch, SetStateAction } from "react";
import template from "./template";

export const toggleOpen = (open: boolean, setOpen: Dispatch<SetStateAction<boolean>>) => () => {
  setOpen(open);
};

export const handleSelect = (
  setDate: Dispatch<SetStateAction<string | undefined>>,
  setOpen: Dispatch<SetStateAction<boolean>>,
  onSelect?: any
) => (date: any) => {
  setDate(date);
  setOpen(false);
  if (onSelect) {
    onSelect(date);
  }
};

export default template;
