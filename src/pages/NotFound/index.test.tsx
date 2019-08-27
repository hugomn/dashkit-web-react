import { shallow } from "enzyme";
import * as React from "react";
import CardContainer from "../../templates/Containers/Cards/template";
import NotFound from ".";

describe("NotFound page", () => {
  const wrapper = shallow(<NotFound />);

  it("should render a CardContainer", () => {
    expect(wrapper.find(CardContainer).length).toBe(1);
  });
});
