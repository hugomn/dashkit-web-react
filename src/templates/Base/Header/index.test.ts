import { CALL_HISTORY_METHOD } from "connected-react-router";
import actions from "../../../store/auth/actions";
import { stateMock } from "../../../tests/mocks/store";
import { mapDispatchToProps, mapStateToProps } from ".";

describe("Header connector", () => {
  it("Should connect to the right state props", () => {
    expect(mapStateToProps(stateMock).isLoggedIn).toBeTruthy();
    expect(mapStateToProps(stateMock).isAdmin).toBeTruthy();
    expect(mapStateToProps(stateMock).pathname).toMatch("/users");
  });

  it("Logout should dispatch correct action", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).logout();
    expect(dispatch.mock.calls[0][0]).toEqual(actions.logoutRequested());
  });

  it("Redirect should dispatch correct action", () => {
    const dispatch = jest.fn();
    mapDispatchToProps(dispatch).redirect("");
    expect(dispatch.mock.calls[0][0].type).toEqual(CALL_HISTORY_METHOD);
  });
});
