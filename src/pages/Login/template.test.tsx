import { mount } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import CardContainer from "../../templates/Containers/Cards/template";
import LoginForm from "./LoginForm";
import NewPasswordRequiredForm from "./NewPasswordRequiredForm";
import Login from ".";

describe("Login Form Tests", () => {
  it("should render one form", () => {
    const wrapper = mount(<CardContainer />);
    expect(wrapper.find(CardContainer).length).toBe(1);
  });

  it("Renders the NewPasswordRequired form if new password required is true", () => {
    const initialState = {
      auth: {
        newPasswordRequired: true
      }
    };

    const store = configureStore()(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    wrapper.setState({ newPasswordRequired: true });
    expect(wrapper.find(NewPasswordRequiredForm).length).toBe(1);
  });

  it("Renders the Login form if new password required is false", () => {
    const initialState = {
      auth: {
        newPasswordRequired: false
      }
    };

    const store = configureStore()(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    wrapper.setState({ newPasswordRequired: false });
    expect(wrapper.find(LoginForm).length).toBe(1);
  });
});
