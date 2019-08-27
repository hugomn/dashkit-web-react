import { getByText as getByTextDOM } from "@testing-library/dom";
import { cleanup, fireEvent, render } from "@testing-library/react";
import * as React from "react";
import HeaderMenu, {
  handleClickOutside,
  handleItemClick,
  renderItem,
  toggleShow
} from "./template";

describe("HeaderMenu component", () => {
  afterEach(cleanup);

  it("hides the drop when clicking an item", () => {
    const onClick = jest.fn();
    const { getByText, container } = render(
      <HeaderMenu
        id="test-menu"
        label="Test"
        items={[{ label: "Item 1", onClick }, { label: "Item 2" }]}
      />
    );
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText("Test"));
    fireEvent.click(getByTextDOM((document as unknown) as HTMLElement, "Item 1"));
    expect(onClick).toBeCalled();
    expect(document.getElementById("test-menu__drop")).toBeNull();
  });

  it("render correctly without an id", () => {
    const { getByText } = render(<HeaderMenu label="Test" items={[{ label: "Item 1" }]} />);
    fireEvent.click(getByText("Test"));
    expect(getByText("Test")).toBeTruthy();
  });

  it("Should render an item correctly", () => {
    const mockSetShow = jest.fn();
    const { getByText } = render(renderItem(mockSetShow)({ label: "Test item" }, 0));
    expect(getByText("Test item")).toBeTruthy();
  });

  describe("handleItemClick", () => {
    it("Should correctly close the menu ", () => {
      const mockSetShow = jest.fn();
      const mockArg = { arg: "test" };
      handleItemClick(mockSetShow)(mockArg);
      expect(mockSetShow).toBeCalledWith(false);
    });

    it("Should correctly call the onClick callback", () => {
      const mockOnClick = jest.fn();
      const mockArg = { arg: "test" };
      handleItemClick(jest.fn(), mockOnClick)(mockArg);
      expect(mockOnClick).toBeCalledWith(mockArg);
    });
  });

  describe("handleClickOutside", () => {
    it("Should close the menu", () => {
      const mockSetShow = jest.fn();
      handleClickOutside(mockSetShow)();
      expect(mockSetShow).toBeCalledWith(false);
    });
  });

  describe("toggleShow", () => {
    it("Should close the menu", () => {
      const mockSetShow = jest.fn();
      toggleShow(true, mockSetShow)();
      expect(mockSetShow).toBeCalledWith(false);
    });

    it("Should open the menu", () => {
      const mockSetShow = jest.fn();
      toggleShow(false, mockSetShow)();
      expect(mockSetShow).toBeCalledWith(true);
    });
  });
});
