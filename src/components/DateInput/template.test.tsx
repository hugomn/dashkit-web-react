import { render } from "@testing-library/react";
import React from "react";
import DateInput from "./template";
import { handleSelect, toggleOpen } from ".";

describe("DateInput component", () => {
  const { container } = render(<DateInput value="2020-02-02" />);
  it("should match the snapshot", () => {
    expect(container).toMatchSnapshot();
  });

  it("handleSelect should call the correct handlers", () => {
    const mockSetDate = jest.fn();
    const mockSetOpen = jest.fn();
    const mockOnSelect = jest.fn();
    const mockDate = "2020-01-02";
    handleSelect(mockSetDate, mockSetOpen, undefined)(mockDate);
    expect(mockSetDate).toHaveBeenLastCalledWith(mockDate);
    expect(mockSetOpen).toHaveBeenLastCalledWith(false);
    expect(mockOnSelect).not.toBeCalled();
    handleSelect(mockSetDate, mockSetOpen, mockOnSelect)(mockDate);
    expect(mockOnSelect).toHaveBeenLastCalledWith(mockDate);
  });

  it("toggleOpen should call correctly the callback", () => {
    const mockSetOpen = jest.fn();
    toggleOpen(true, mockSetOpen)();
    expect(mockSetOpen).toHaveBeenLastCalledWith(true);
    toggleOpen(false, mockSetOpen)();
    expect(mockSetOpen).toHaveBeenLastCalledWith(false);
  });
});
