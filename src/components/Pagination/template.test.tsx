import { fireEvent, render } from "@testing-library/react";
import { mount } from "enzyme";
import { Button } from "grommet";
import * as React from "react";
import Pagination from ".";

describe("Pagination", () => {
  it("onPageChange is called when an option is selected", () => {
    window.scrollTo = jest.fn();
    const onChange = jest.fn();
    const { getByDisplayValue, getByText } = render(
      <Pagination totalPages={2} page={0} onPageChange={onChange} />
    );
    fireEvent.click(getByDisplayValue("1"));
    fireEvent.click(getByText("2"));
    expect(onChange).toBeCalled();
  });

  it("returns the next page", () => {
    const onChange = jest.fn();
    const wrapper = mount(<Pagination page={0} onPageChange={onChange} />);
    expect(wrapper.find("input").filter('[value="1"]').length).toBe(1);
  });

  describe("Prev button", () => {
    it("returns the previous page", () => {
      const onChange = jest.fn();
      const wrapper = mount(<Pagination totalPages={2} page={1} onPageChange={onChange} />);
      wrapper
        .find(Button)
        .filter('[label="global.pagination.previous"]')
        .simulate("click");
      expect(onChange).toHaveBeenCalledWith(0);
    });
  });

  describe("Next button", () => {
    it("returns the next page", () => {
      const onChange = jest.fn();
      const wrapper = mount(<Pagination totalPages={2} onPageChange={onChange} />);
      wrapper
        .find(Button)
        .filter('[label="global.pagination.next"]')
        .simulate("click");
      expect(onChange).toHaveBeenCalledWith(1);
    });
  });
});
