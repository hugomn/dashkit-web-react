import { mount } from "enzyme";
import { Formik } from "formik";
import { Grommet } from "grommet";
import i18n from "i18next";
import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import theme from "../../../constants/theme";
import LoginForm from "./template";

describe("Login Form mounts", () => {
  const initialState = {};
  const store = configureStore()(initialState);
  const mockLogin = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Grommet theme={theme}>
          <LoginForm i18n={i18n} tReady t={jest.fn()} login={mockLogin} />
        </Grommet>
      </MemoryRouter>
    </Provider>
  );

  it("should render one form", () => {
    expect(wrapper.find(Formik).length).toBe(1);
  });

  it("submits the login form", async () => {
    const preventDefault = jest.fn();
    await wrapper.find("form").simulate("submit", {
      preventDefault
    });
    expect(preventDefault).toBeCalled();
  });

  it("form submit call correctly the onSumit prop", async () => {
    const instance: any = wrapper.find(LoginForm).instance();
    instance.handleLogin({
      email: "john.doe@bcgdv.com",
      password: "test123"
    });
    expect(mockLogin).toHaveBeenCalled();
  });
});
