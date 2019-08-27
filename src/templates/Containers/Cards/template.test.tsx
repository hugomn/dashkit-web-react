import { mount } from "enzyme";
import { Box } from "grommet";
import * as React from "react";
import CardContainer from ".";

describe("Card container", () => {
  const wrapper = mount(<CardContainer />);

  it("should render a wrapper and a container as boxes", () => {
    expect(wrapper.find(Box).length).toBe(2);
  });
});
