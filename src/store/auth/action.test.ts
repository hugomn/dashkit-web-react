import { adminUserMock } from "../../tests/mocks/store";
import { userPasswordMock } from "../../tests/mocks/user";
import actions from "./actions";
import { AuthActionTypes, IAuthState } from "./types";

const authMock: IAuthState = {
  isLoggedIn: true,
  isSessionBootstrapped: true,
  newPasswordRequired: false
};

describe("Auth actions", () => {
  it("loginRequested should return the correct action type", () => {
    expect(actions.loginRequested(userPasswordMock.email, userPasswordMock.password).type).toEqual(
      AuthActionTypes.AUTH_LOGIN_REQUESTED
    );
  });

  it("loginSucceeded should return the correct action type", () => {
    expect(actions.loginSucceeded(adminUserMock).type).toEqual(
      AuthActionTypes.AUTH_LOGIN_SUCCEEDED
    );
  });

  it("loginFailed should return the correct action type", () => {
    expect(actions.loginFailed("").type).toEqual(AuthActionTypes.AUTH_LOGIN_FAILED);
  });

  it("logoutRequested should return the correct action type", () => {
    expect(actions.logoutRequested().type).toEqual(AuthActionTypes.AUTH_LOGOUT_REQUESTED);
  });

  it("logoutSucceeded should return the correct action type", () => {
    expect(actions.logoutSucceeded(authMock).type).toEqual(AuthActionTypes.AUTH_LOGOUT_SUCCEEDED);
  });

  it("logoutFailed should return the correct action type", () => {
    expect(actions.logoutFailed("").type).toEqual(AuthActionTypes.AUTH_LOGOUT_FAILED);
  });

  it("resetPasswordFailed should return the correct action type", () => {
    expect(actions.resetPasswordFailed("").type).toEqual(
      AuthActionTypes.AUTH_RESET_PASSWORD_FAILED
    );
  });

  it("resetPasswordRequested should return the correct action type", () => {
    expect(actions.resetPasswordRequested("john.doe@bcgdv.com", "231", "password").type).toEqual(
      AuthActionTypes.AUTH_RESET_PASSWORD_REQUESTED
    );
  });

  it("resetPasswordSucceeded should return the correct action type", () => {
    expect(actions.resetPasswordSucceeded().type).toEqual(
      AuthActionTypes.AUTH_RESET_PASSWORD_SUCCEEDED
    );
  });

  it("newPasswordRequired should return the correct action type", () => {
    expect(actions.newPasswordRequired("").type).toEqual(
      AuthActionTypes.AUTH_LOGIN_NEW_PASSWORD_REQUIRED
    );
  });
  it("newPasswordChallengeRequested should return the correct action type", () => {
    expect(actions.newPasswordChallengeRequested(userPasswordMock.password).type).toEqual(
      AuthActionTypes.AUTH_LOGIN_NEW_PASSWORD_CHALLENGE_REQUESTED
    );
  });
  it("newPasswordChallengeSucceeded should return the correct action type", () => {
    expect(actions.newPasswordChallengeSucceeded().type).toEqual(
      AuthActionTypes.AUTH_LOGIN_NEW_PASSWORD_CHALLENGE_SUCCEEDED
    );
  });
  it("newPasswordChallengeFailed should return the correct action type", () => {
    expect(actions.newPasswordChallengeFailed("").type).toEqual(
      AuthActionTypes.AUTH_LOGIN_NEW_PASSWORD_CHALLENGE_FAILED
    );
  });

  it("bootstrapSessionFailed should return the correct action type", () => {
    expect(actions.bootstrapSessionFailed().type).toEqual(
      AuthActionTypes.AUTH_SESSION_BOOTSTRAP_FAILED
    );
  });

  it("bootstrapSessionRequested should return the correct action type", () => {
    expect(actions.bootstrapSessionRequested().type).toEqual(
      AuthActionTypes.AUTH_SESSION_BOOTSTRAP_REQUESTED
    );
  });

  it("bootstrapSessionSucceeded should return the correct action type", () => {
    expect(actions.bootstrapSessionSucceeded().type).toEqual(
      AuthActionTypes.AUTH_SESSION_BOOTSTRAP_SUCCEEDED
    );
  });
});
