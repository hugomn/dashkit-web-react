import { createMemoryHistory } from "history";
import { createStore } from "redux";
import { stateMock, authMock } from "../tests/mocks/store";
import actions from "./auth/actions";
import { rootReducer } from ".";

describe("Store root reducer", () => {
  const reducer = rootReducer(createMemoryHistory());
  const store = createStore(reducer);

  it("should have the initial router state pointing to home route", () => {
    expect(store.getState().router.location.pathname).toEqual("/");
  });

  it("should clear the redux state when logout action is dispatched", () => {
    const state = rootReducer(createMemoryHistory())(stateMock, actions.logoutSucceeded(authMock));
    expect(state.users.users).toBeUndefined();
  });
});
