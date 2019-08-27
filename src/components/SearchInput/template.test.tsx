import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import SearchInput from "./template";
import { handleClear } from ".";

describe("SearchInput component", () => {
  it("should trigger onSearch on change input", () => {
    const mockOnSearch = jest.fn();
    const { getByTestId } = render(
      <SearchInput query="" onSearch={mockOnSearch} onClear={mockOnSearch} />
    );
    fireEvent.change(getByTestId("searchinput"), { target: { value: "value" } });
    expect(mockOnSearch).toHaveBeenLastCalledWith("value");
  });

  it("should handle clear button when query is not empty", () => {
    const { getByTestId } = render(
      <SearchInput query="foo" onSearch={jest.fn()} onClear={jest.fn()} />
    );
    expect(getByTestId("clear")).toBeTruthy();
  });

  describe("handleClear method", () => {
    it("should call onClear ", () => {
      const mockOnClear = jest.fn();
      handleClear(mockOnClear)();
      expect(mockOnClear).toHaveBeenCalled();
    });
  });
});
