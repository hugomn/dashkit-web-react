import { mount } from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import LanguageSelector from "../../../components/LanguageSelector";
import Footer from "./template";

describe("Footer", () => {
  const initialState = {
    i18n: {
      language: "en"
    }
  };
  const store = configureStore()(initialState);
  it("should render the language selector", () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(LanguageSelector)).toHaveLength(1);
  });
});
