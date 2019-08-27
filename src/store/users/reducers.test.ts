import { usersMock } from "../../tests/mocks/user";
import actions from "./actions";
import usersReducer, { initialState } from "./reducers";

describe("Users fetch all reducers", () => {
  it("should set isLoading when its requested", () => {
    const state = usersReducer(initialState, actions.fetchAllRequested());
    expect(state.isLoading).toBeTruthy();
  });

  it("should set isLoading when its failed", () => {
    const state = usersReducer(initialState, actions.fetchAllFailed(new Error()));
    expect(state.isLoading).toBeFalsy();
  });

  it("should set the correct state when its succeeded", () => {
    const state = usersReducer(initialState, actions.fetchAllSucceeded(usersMock));
    expect(state.users).toEqual(usersMock);
    expect(state.isLoading).toBeFalsy();
  });
});
