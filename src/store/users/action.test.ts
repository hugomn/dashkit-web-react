import { usersMock } from "../../tests/mocks/user";
import actions from "./actions";
import { UsersActionTypes } from "./types";

describe("Users fetch all actions", () => {
  it("fetchRequested", () => {
    expect(actions.fetchAllRequested().type).toEqual(UsersActionTypes.USERS_FETCH_ALL_REQUESTED);
  });

  it("fetchSucceeded", () => {
    expect(actions.fetchAllSucceeded(usersMock).type).toEqual(
      UsersActionTypes.USERS_FETCH_ALL_SUCCEEDED
    );
  });

  it("fetchFailed", () => {
    expect(actions.fetchAllFailed(new Error()).type).toEqual(
      UsersActionTypes.USERS_FETCH_ALL_FAILED
    );
  });
});
