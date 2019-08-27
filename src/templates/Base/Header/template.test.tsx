import { mount, shallow } from "enzyme";
import { Anchor, ResponsiveContext } from "grommet";
import * as React from "react";
import { MemoryRouter } from "react-router-dom";
import logoFull from "../../../assets/img/logo-full.svg";
import { publicRoutes } from "../../../constants/routes";
import Header, { handleMenuClick, isSelected } from "./template";

describe("Header", () => {
  it("should render full logo when displaying on big devices", () => {
    const wrapper = mount(
      <MemoryRouter>
        <ResponsiveContext.Provider value="small">
          <Header isLoggedIn logout={jest.fn()} pathname="/" redirect={jest.fn()} />
        </ResponsiveContext.Provider>
      </MemoryRouter>
    );
    expect(wrapper.find(`img[src="${logoFull}"]`)).toHaveLength(1);
  });

  it("should render mobile version logo when in mobile devices", () => {
    const wrapper = mount(
      <MemoryRouter>
        <ResponsiveContext.Provider value="large">
          <Header isLoggedIn logout={jest.fn()} pathname="/" redirect={jest.fn()} />
        </ResponsiveContext.Provider>
      </MemoryRouter>
    );
    expect(wrapper.find(`img[src="${logoFull}"]`)).toHaveLength(1);
  });

  it("should render correct links when user is not logged in", () => {
    const wrapper = mount(
      <MemoryRouter>
        <ResponsiveContext.Provider value="small">
          <Header isLoggedIn={false} logout={jest.fn()} pathname="/" redirect={jest.fn()} />
        </ResponsiveContext.Provider>
      </MemoryRouter>
    );
    expect(wrapper.find({ to: publicRoutes.login.path })).toHaveLength(1);
  });

  it("should call logout when clicking logout", () => {
    const mockLogout = jest.fn();
    const wrapper = shallow(
      <Header isLoggedIn logout={mockLogout} pathname="/" redirect={jest.fn()} />
    );
    wrapper.find(Anchor).simulate("click");
    expect(mockLogout).toHaveBeenCalled();
  });

  describe("Test isSelected logic", () => {
    it("should return selected as a class on matching paths", () => {
      expect(isSelected("users", "users")).toBeTruthy();
    });

    it("should return an empty string if paths do not match", () => {
      expect(isSelected("users", "")).toBeFalsy();
    });
  });

  describe("handleMenuClick", () => {
    it("should redirect to the right path", () => {
      const mockRedirect = jest.fn();
      handleMenuClick("path", mockRedirect)();
      expect(mockRedirect).toHaveBeenCalledWith("path", undefined);
    });
  });
});
