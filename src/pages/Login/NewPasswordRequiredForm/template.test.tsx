import { mount } from "enzyme";
import { Form } from "formik";
import { Grommet } from "grommet";
import i18n from "i18next";
import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import theme from "../../../constants/theme";
import NewPasswordRequiredForm from "./template";

describe("New Password Required Form mounts", () => {
  const preventDefault = jest.fn();
  const initialState = {};
  const store = configureStore()(initialState);
  const mockSetNewPassword = jest.fn();
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <Grommet theme={theme}>
          <NewPasswordRequiredForm
            tReady
            i18n={i18n}
            t={jest.fn()}
            setNewPassword={mockSetNewPassword}
          />
        </Grommet>
      </MemoryRouter>
    </Provider>
  );
  it("should render one form", () => {
    expect(wrapper.find(Form).length).toBe(1);
  });

  it("Submits the new password required form", async () => {
    await wrapper.find("form").simulate("submit", {
      preventDefault
    });
    expect(preventDefault).toBeCalled();
  });

  it("form submit call correctly the onSubmit prop", async () => {
    const instance: any = wrapper.find(NewPasswordRequiredForm).instance();
    instance.handleNewPassword({
      password: "test123"
    });
    expect(mockSetNewPassword).toHaveBeenCalled();
  });
});
