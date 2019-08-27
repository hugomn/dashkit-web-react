import { css } from "styled-components";

export const breakpoints = {
  xs: 0, // Extra small devices (portrait phones, less than 576px)
  // tslint:disable-next-line:object-literal-sort-keys
  sm: 576, // Small devices (landscape phones, 576px and up)
  md: 768, // Medium devices (tablets, 768px and up)
  lg: 992, // Large devices (desktops, 992px and up)
  xl: 1200 // Extra large devices (large desktops, 1200px and up)
};

// iterate through the sizes and create a media template
export const media: { [key: string]: any } = Object.keys(breakpoints).reduce(
  (accumulator, label) => ({
    ...accumulator,
    [label]: (...args: any) => css`
      @media (min-width: ${breakpoints[label]}px) {
        ${css(args)}
      }
    `
  }),
  {}
);

export const visible: { [key: string]: any } = Object.keys(breakpoints).reduce(
  (accumulator, label) => ({
    ...accumulator,
    [label]: () => css`
      display: none;
      ${media[label]`
        display: block;
      `};
    `
  }),
  {}
);

export const hidden: { [key: string]: any } = Object.keys(breakpoints).reduce(
  (accumulator, label) => ({
    ...accumulator,
    [label]: () => css`
      display: block;
      ${media[label]`
        display: none;
      `};
    `
  }),
  {}
);

export const gridUnavailable = (...args: any) => (!isGridAvailable() ? css(args) : null);

export const isGridAvailable = () =>
  typeof window !== "undefined" &&
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports("display", "grid");
