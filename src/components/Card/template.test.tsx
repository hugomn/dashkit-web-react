import { render } from "@testing-library/react";
import * as React from "react";
import Card from "./template";

describe("Card component", () => {
  it("Should match snapshot", () => {
    const { container } = render(<Card title="title" />);
    expect(container).toMatchSnapshot();
  });
});
