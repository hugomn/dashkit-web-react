import template from "./template";

export const handleClear = (onClear: () => void) => () => {
  onClear();
};

export default template;
