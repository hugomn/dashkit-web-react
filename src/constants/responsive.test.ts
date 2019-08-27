import { css } from "styled-components";
import {
  breakpoints,
  gridUnavailable,
  hidden,
  isGridAvailable,
  media,
  visible
} from "./responsive";

describe("Responsive", () => {
  it("media helper should return the correct media query", () => {
    const mockCss = `font-size: 1px;`;
    const mediaSm = css`
      @media (min-width: ${breakpoints.sm}px) {
        ${mockCss}
      }
    `;
    expect(media.sm(mockCss)).toEqual(mediaSm);
  });

  it("visible helper should return the correct media query for visible items", () => {
    const visibleSm = css`
      display: none;
      ${media.sm`
        display: block;
      `};
    `;
    expect(visible.sm()).toEqual(visibleSm);
  });

  it("hidden helper should return the correct media query for hidden items", () => {
    const hiddenSm = css`
      display: block;
      ${media.sm`
        display: none;
      `};
    `;
    expect(hidden.sm()).toEqual(hiddenSm);
  });

  it("isGridAvailable method check the CSS grid availability in the window object", () => {
    window.CSS.supports = () => true;
    expect(isGridAvailable()).toBeTruthy();
    window.CSS.supports = () => false;
    expect(isGridAvailable()).toBeFalsy();
  });

  it("gridUnavailable helper doesn't render CSS when grid is not available", () => {
    const mockCss = `
      display: block;
    `;
    window.CSS.supports = () => false;
    expect(gridUnavailable(mockCss)).toBeTruthy();
    window.CSS.supports = () => true;
    expect(gridUnavailable(mockCss)).toBeFalsy();
  });
});
