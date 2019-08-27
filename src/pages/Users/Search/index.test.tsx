import { cleanup, fireEvent, render } from "@testing-library/react";
import * as React from "react";
import Search, { handleChangeQuery, handleSubmit } from "./template";

describe("Search component", () => {
  afterEach(cleanup);

  it("clear the input and search when clear icon is clicked", () => {
    const mockClear = jest.fn();
    const { getByTestId } = render(<Search query="test" onChange={mockClear} />);
    const clear = getByTestId("clear");
    fireEvent.click(clear);
    expect(mockClear).toHaveBeenCalledWith("");
  });

  it("handleSubmit", () => {
    const mockOnChange = jest.fn();
    const mockPreventDefault = jest.fn();
    const e = { preventDefault: mockPreventDefault } as any;
    handleSubmit("test", mockOnChange)(e);
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockPreventDefault).toHaveBeenCalled();
  });

  it("handleChangeQuery", () => {
    const mockOnChange = jest.fn();
    handleChangeQuery(mockOnChange)({
      target: { value: "foo" }
    } as any);
    expect(mockOnChange).toBeCalledWith("foo");
  });
});
