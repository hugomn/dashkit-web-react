import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import Modal from "./template";

describe("Modal component", () => {
  const mockOnClose = jest.fn();
  it("should match the snapshot", () => {
    const { container } = render(<Modal onClose={mockOnClose} />);
    expect(container).toMatchSnapshot();
  });

  it("should call onClose on click", () => {
    const { getByTestId } = render(<Modal onClose={mockOnClose} />);
    fireEvent.click(getByTestId("close"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
