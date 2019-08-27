import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import RadioCard from "./template";

describe("Radio Card component", () => {
  it("Renders a radio card", () => {
    const mockOnSelect = jest.fn();
    const { getByTestId } = render(
      <RadioCard
        value="test"
        label="test"
        description="test"
        selected
        onSelect={mockOnSelect}
        disabled={false}
      />
    );

    fireEvent.click(getByTestId("test"));
    expect(mockOnSelect).toHaveBeenCalled();
  });
});
