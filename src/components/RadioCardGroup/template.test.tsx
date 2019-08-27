import { cleanup, fireEvent, render } from "@testing-library/react";
import { shallow } from "enzyme";
import * as React from "react";
import RadioCard from "./RadioCard";
import RadioCardGroup from ".";

const options = [
  {
    value: "c1",
    label: "Choice 1",
    description: "Lorem ipsum dolor sit amet, ei usu recteque constituto."
  },
  {
    value: "c2",
    label: "Choice 2",
    description: "Lorem ipsum dolor sit amet, ei usu recteque constituto."
  },
  {
    value: "c3",
    label: "Choice 3",
    description: "Lorem ipsum dolor sit amet, ei usu recteque constituto."
  }
];

describe("Radio Card Group", () => {
  afterEach(() => cleanup());

  it("Render a radio card group", () => {
    const wrapper = shallow(<RadioCardGroup options={options} />);
    expect(wrapper.find(RadioCard)).toHaveLength(options.length);
  });

  it("Displays a disabled card group", () => {
    const { container } = render(<RadioCardGroup disabled options={options} />);
    expect(container).toMatchSnapshot();
  });

  it("Calls onSelect", () => {
    const mockOnSelect = jest.fn();
    const { getByDisplayValue } = render(
      <RadioCardGroup disabled options={options} onSelect={mockOnSelect} />
    );
    fireEvent.click(getByDisplayValue("c1"));
    expect(mockOnSelect).toHaveBeenCalled();
  });
});
