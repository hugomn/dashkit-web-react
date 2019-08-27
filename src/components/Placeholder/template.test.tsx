import { render } from "@testing-library/react";
import * as React from "react";
import AlertIcon from "../../assets/img/icons/alert.svg";
import Placeholder from ".";

describe("Placeholder", () => {
  it("should render the icon, title and description", () => {
    const { getByTestId } = render(
      <Placeholder icon={AlertIcon} title="Title" description="Description" />
    );
    expect(getByTestId("icon").getAttribute("src")).toBe("alert.svg");
    expect(getByTestId("title").textContent).toBe("Title");
    expect(getByTestId("description").textContent).toBe("Description");
  });
});
