import { mount, shallow } from "enzyme";
import i18n from "i18next";
import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import cognito from "../../service/cognito";
import CardContainer from "../../templates/Containers/Cards/template";
import ForgotPassword from "./template";

jest.mock("../../service/cognito");

describe("Reset password tests", () => {
  const mockdispatch = jest.fn();
  const mockt = jest.fn();

  it("Should render the reset password page", () => {
    const wrapper = shallow(
      <ForgotPassword tReady i18n={i18n} t={mockt} dispatch={mockdispatch} />
    );
    expect(wrapper.find(CardContainer).length).toBe(1);
  });

  it("Should render the intial forgot password screen if email verified is true", () => {
    const initialState = {};
    const store = configureStore()(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ForgotPassword i18n={i18n} tReady t={mockt} dispatch={mockdispatch} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.setState({ emailVerified: true });
    expect(wrapper.state("emailVerified")).toEqual(true);
  });

  it("Submits the new password form", async () => {
    const preventDefault = jest.fn();
    const initialState = {};
    const store = configureStore()(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ForgotPassword i18n={i18n} tReady t={mockt} dispatch={mockdispatch} />
        </MemoryRouter>
      </Provider>
    );
    await wrapper.find("form").simulate("submit", {
      preventDefault
    });
    expect(preventDefault).toBeCalled();
  });

  describe("Test the handle submit", () => {
    let mockEmail: {};

    beforeEach(() => {
      mockEmail = { email: "john.doe@bcgdv.com" };
    });

    const initialState = {};
    const store = configureStore()(initialState);
    const context = { store };
    const wrapper = shallow(
      <ForgotPassword i18n={i18n} tReady t={mockt} dispatch={mockdispatch} />,
      {
        context
      }
    );

    it("sets the state after forgot password was resolved", async () => {
      const instance: any = wrapper.instance();
      await instance.handleSubmit(mockEmail);
      expect(wrapper.state("emailVerified")).toEqual(true);
      expect(wrapper.state("email")).toEqual("john.doe@bcgdv.com");
    });

    it("throws and error if forgot password was not successful", async () => {
      const mockForgotPassword = jest.spyOn(cognito, "forgotPassword");
      mockForgotPassword.mockImplementation(() => {
        throw new Error("fail");
      });
      const instance: any = wrapper.instance();
      await instance.handleSubmit(mockEmail);
      expect(wrapper.state("emailVerified")).toEqual(false);
    });
  });
});
