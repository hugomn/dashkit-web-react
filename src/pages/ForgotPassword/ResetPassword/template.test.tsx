import { mount, shallow } from "enzyme";
import { Formik } from "formik";
import { Grommet } from "grommet";
import i18n from "i18next";
import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import theme from "../../../constants/theme";
import { passwordValidations } from "../../../utils/validations";
import ResetPasswordForm from "./template";

describe("Tests for reset password form", () => {
  it("Should render the reset password form", () => {
    const wrapper = shallow(
      <ResetPasswordForm tReady i18n={i18n} t={jest.fn()} email="" resetPassword={jest.fn()} />
    );
    expect(wrapper.find(Formik)).toHaveLength(1);
  });

  it("form submit call correctly the onSumit prop", async () => {
    const initialState = {};
    const store = configureStore()(initialState);
    const mockSetNewPassword = jest.fn();
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Grommet theme={theme}>
            <ResetPasswordForm
              tReady
              i18n={i18n}
              t={jest.fn()}
              email=""
              resetPassword={mockSetNewPassword}
            />
          </Grommet>
        </MemoryRouter>
      </Provider>
    );
    const instance: any = wrapper.find(ResetPasswordForm).instance();
    instance.resetPassword({
      email: "john.doe@bcgdv.com",
      password: "test123",
      pin: "123456"
    });
    expect(mockSetNewPassword).toHaveBeenCalled();
  });

  describe("Test password validation expresssions", () => {
    it("password validations return as expected", () => {
      const mockValid = [true, true, true, true];
      const validations = passwordValidations.map(validation => {
        return validation.isValid("Test1234");
      });
      expect(validations).toEqual(mockValid);
    });

    it("returns false on invalid password", () => {
      const mockValid = [false, false, false, false];
      const validations = passwordValidations.map(validation => {
        return validation.isValid(" ");
      });
      expect(validations).toEqual(mockValid);
    });
  });
});
