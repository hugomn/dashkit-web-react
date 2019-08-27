import { shallow, mount } from "enzyme";
import { Grommet } from "grommet";
import i18n from "i18next";
import * as React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import actions from "../../store/auth/actions";
import routeComponentMock from "../../tests/mocks/route";
import Loading from "../Loading";
import { stateMock } from "../../tests/mocks/store";
import AppTemplate from "./template";
import { mapDispatchToProps, mapStateToProps } from ".";

describe("App main wrapper", () => {
  it("should not render routes until session is bootstrapped ", () => {
    const wrapper = shallow(
      <AppTemplate
        i18n={i18n}
        t={jest.fn()}
        tReady
        {...routeComponentMock}
        bootstrapSession={jest.fn()}
        isSessionBootstrapped={false}
      />
    );
    expect(wrapper.find(Loading).length).toBe(1);
    expect(i18n.t("test")).toBe("test");
  });

  it("should render properly when session is finally bootstrapped ", () => {
    const mockBootstrapSession = jest.fn();
    const initialState = stateMock;
    const store = configureStore()(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <AppTemplate
            i18n={i18n}
            t={jest.fn()}
            tReady
            {...routeComponentMock}
            bootstrapSession={mockBootstrapSession}
            isSessionBootstrapped
          />
        </MemoryRouter>
      </Provider>
    );
    expect(mockBootstrapSession).toBeCalled();
    expect(wrapper.find(Grommet).length).toBe(1);
  });

  describe("Header connector", () => {
    it("Should connect to the right state props", () => {
      const mockedState: any = {
        auth: {
          isSessionBootstrapped: false
        }
      };
      expect(mapStateToProps(mockedState).isSessionBootstrapped).toBeFalsy();
    });

    it("Logout should dispatch logoutRequested action", () => {
      const dispatch = jest.fn();
      mapDispatchToProps(dispatch).bootstrapSession();
      expect(dispatch.mock.calls[0][0]).toEqual(actions.bootstrapSessionRequested());
    });
  });
});
