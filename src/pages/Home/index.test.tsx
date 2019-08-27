import { shallow } from "enzyme";
import * as React from "react";
import { Redirect } from "react-router-dom";
import Home from ".";

describe("Home", () => {
  it("should redirect to Users page", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find(Redirect)).toBeTruthy();
  });
});
