import { adminUserMock, authMock } from "../../tests/mocks/store";
import actions from "./actions";
import authReducer, { initialState } from "./reducers";
import { AuthActionTypes } from "./types";

describe("Auth reducer", () => {
  it("should set the current user when get succeeded", () => {
    const state = authReducer(initialState, {
      payload: authMock,
      type: AuthActionTypes.AUTH_LOGIN_SUCCEEDED
    });
    expect(state.isLoggedIn).toBeTruthy();
    expect(state.newPasswordRequired).toBeFalsy();
  });

  it("should set the correct state when login succeeded", () => {
    const state = authReducer(initialState, actions.loginSucceeded(adminUserMock));
    expect(state.user).toBe(adminUserMock);
  });

  it("should set the correct state when login failed", () => {
    const state = authReducer(initialState, {
      payload: { error: "Failed" },
      type: AuthActionTypes.AUTH_LOGIN_FAILED
    });
    expect(state.isLoggedIn).toBeFalsy();
    expect(state.newPasswordRequired).toBeFalsy();
  });

  it("should set the correct state when user hasn't changed his password", () => {
    const state = authReducer(initialState, {
      payload: { email: "" },
      type: AuthActionTypes.AUTH_LOGIN_NEW_PASSWORD_REQUIRED
    });
    expect(state.isLoggedIn).toBeFalsy();
    expect(state.newPasswordRequired).toBeTruthy();
  });

  it("should add user e-mail to state when new password is required", () => {
    const emailMock = "john.doe@bcgdv.com";
    const state = authReducer(initialState, {
      payload: emailMock,
      type: AuthActionTypes.AUTH_LOGIN_NEW_PASSWORD_REQUIRED
    });
    expect(state.email).toEqual(emailMock);
  });

  it("should set the correct state when new password challenge succeeded", () => {
    const state = authReducer(initialState, {
      payload: authMock,
      type: AuthActionTypes.AUTH_LOGIN_NEW_PASSWORD_CHALLENGE_SUCCEEDED
    });
    expect(state.isLoggedIn).toBeTruthy();
    expect(state.newPasswordRequired).toBeFalsy();
  });

  it("should set the correct state when logout succeeds", () => {
    const state = authReducer(initialState, {
      type: AuthActionTypes.AUTH_LOGOUT_SUCCEEDED
    });
    expect(state.isLoggedIn).toBeFalsy();
    expect(state.newPasswordRequired).toBeFalsy();
  });

  it("should not change the isLoggedIn state when logout fails", () => {
    const state = authReducer(
      { ...initialState, isLoggedIn: true },
      {
        type: AuthActionTypes.AUTH_LOGOUT_FAILED
      }
    );
    expect(state.isLoggedIn).toBeTruthy();
  });

  it("should set user to logged when session is validated correctly", () => {
    const state = authReducer(initialState, {
      type: AuthActionTypes.AUTH_SESSION_VALIDATED
    });
    expect(state.isLoggedIn).toBeTruthy();
  });

  it("should set the session as bootstrap in case of success and failure", () => {
    const stateSuccess = authReducer(initialState, {
      type: AuthActionTypes.AUTH_SESSION_BOOTSTRAP_SUCCEEDED
    });
    const stateFailure = authReducer(initialState, {
      type: AuthActionTypes.AUTH_SESSION_BOOTSTRAP_FAILED
    });
    expect(stateSuccess.isSessionBootstrapped).toBeTruthy();
    expect(stateFailure.isSessionBootstrapped).toBeTruthy();
  });

  it("should change the state when reset password succeeds", () => {
    const state = authReducer(initialState, {
      type: AuthActionTypes.AUTH_RESET_PASSWORD_SUCCEEDED
    });
    expect(state.newPasswordRequired).toBeFalsy();
  });

  it("should not change the state when reset password fails", () => {
    const state = authReducer(initialState, {
      payload: { error: "Error" },
      type: AuthActionTypes.AUTH_RESET_PASSWORD_FAILED
    });
    expect(state.error).toBeTruthy();
  });
});
