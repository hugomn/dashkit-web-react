import { mount, shallow } from "enzyme";
import i18n from "i18next";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { changeLanguage } from "../../store/i18n/actions";
import LanguageSelector from "./template";
import { mapDispatchToProps } from "./index";

const initialState = {
  i18n: {
    language: "en"
  }
};

describe("Language selector", () => {
  const store = configureStore()(initialState);

  it("should render the LanguageSelector", () => {
    const wrapper = mount(
      <LanguageSelector i18n={i18n} t={jest.fn()} tReady language="en" changeLanguage={jest.fn()} />
    );
    expect(wrapper.find(LanguageSelector)).toHaveLength(1);
  });

  it("Language selector should respond to language change on select", () => {
    const mockChangeLanguage = jest.fn();
    const props = {
      changeLanguage: mockChangeLanguage,
      language: "en"
    };
    const wrapper = shallow(
      <Provider store={store}>
        <LanguageSelector i18n={i18n} t={jest.fn()} tReady {...props} />
      </Provider>
    );
    wrapper
      .find(LanguageSelector)
      .dive()
      .props()
      [
        // eslint-disable-next-line dot-notation
        "items"
      ][0].onClick("");
    expect(mockChangeLanguage).toBeCalled();
  });

  it("Dispatches the right action", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).changeLanguage("fr");
    expect(dispatch.mock.calls[0][0]).toEqual(changeLanguage("fr"));
  });
});
