import { mount, shallow } from "enzyme";
import { createMemoryHistory } from "history";
import * as React from "react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Switch } from "react-router-dom";
import configureStore from "redux-mock-store";
import { publicRoutes, restrictedRoutes } from "./constants/routes";
import { mapStateToProps, Routes } from "./routes";
import PublicTemplate from "./templates/Public/template";
import RestrictedTemplate from "./templates/Restricted/template";
import { usersMock } from "./tests/mocks/user";

describe("Routes", () => {
  const mock: any = jest.fn();
  const initialState = {
    analytics: {},
    auth: {
      isLoggedIn: false,
      newPasswordRequired: true
    },
    i18n: {
      language: "en"
    },
    router: {
      location: {
        pathname: "/"
      }
    },
    users: {
      users: usersMock
    }
  };
  it("should render routes correctly", () => {
    const wrapper = shallow(
      <Routes location={mock} match={mock} history={createMemoryHistory()} isLoggedIn={false} />
    );

    expect(wrapper.find(Switch).find(Route).length).toBe(
      Object.keys(publicRoutes).length + Object.keys(restrictedRoutes).length
    );
  });

  it("should render the public templates", () => {
    const store = configureStore()(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[publicRoutes[Object.keys(publicRoutes)[0]].path]}>
          <Routes location={mock} match={mock} history={createMemoryHistory()} isLoggedIn={false} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(Switch).find(PublicTemplate).length).toBe(1);
  });

  it("should render the restricted templates when logged in", () => {
    const store = configureStore()({ ...initialState, auth: { isLoggedIn: true } });

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[restrictedRoutes[Object.keys(restrictedRoutes)[0]].path]}>
          <Routes location={mock} match={mock} history={createMemoryHistory()} isLoggedIn />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(Switch).find(RestrictedTemplate).length).toBe(1);
  });

  it("should render the public templates when user is not logged in", () => {
    const store = configureStore()(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[restrictedRoutes[Object.keys(restrictedRoutes)[0]].path]}>
          <Routes location={mock} match={mock} history={createMemoryHistory()} isLoggedIn={false} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find(Switch).find(PublicTemplate).length).toBe(1);
  });

  it("Should connect to the right state props", () => {
    const mockedState: any = { auth: { isLoggedIn: false } };
    expect(mapStateToProps(mockedState).isLoggedIn).toBeFalsy();
  });
});
