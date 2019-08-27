import { mount } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import IntlProvider from "./IntlProvider";

const initialState = {
  i18n: {
    language: "en"
  }
};

describe("Test that language changes", () => {
  const store = configureStore()(initialState);
  const props = { language: "en" };

  const wrapper = mount(
    <Provider store={store}>
      <IntlProvider {...props} />
    </Provider>
  );

  it("Renders the intl provider as it should", () => {
    expect(wrapper.find(IntlProvider)).toHaveLength(1);
  });
});
