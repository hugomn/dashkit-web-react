import { shallow } from "enzyme";
import * as React from "react";
import BaseTemplate from "../Base/template";
import RestrictedTemplate from ".";

describe("Restricted template", () => {
  const wrapper = shallow(<RestrictedTemplate component={() => <div />} />);

  it("should render a base element", () => {
    expect(wrapper.find(BaseTemplate)).toHaveLength(1);
  });
});
