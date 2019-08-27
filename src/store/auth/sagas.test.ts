import { push } from "connected-react-router";
import { error, success } from "react-toastify-redux";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import { call, select, takeLatest } from "redux-saga/effects";
import { publicRoutes, restrictedRoutes } from "../../constants/routes";
import api from "../../service/api";
import cognito from "../../service/cognito";
import {
  adminUserMock,
  authMock,
  cognitoSessionMock,
  stateMock,
  userMock
} from "../../tests/mocks/store";
import { userMockResetPassword, userPasswordMock } from "../../tests/mocks/user";
import actions from "./actions";
import sagas, {
  bootstrapRequested,
  getAuthEmail,
  getI18nLanguage,
  login,
  loginFailed,
  logout,
  logoutSucceeded,
  newPasswordChallengeRequested,
  newPasswordChallengeSucceeded,
  resetPassword,
  resetPasswordFailed,
  resetPasswordSucceeded,
  setAccessToken
} from "./sagas";
import { AuthActionTypes } from "./types";

describe("Auth saga", () => {
  it("call the correct saga for dispatched actions", () => {
    testSaga(sagas)
      .next()
      .all([
        takeLatest(AuthActionTypes.AUTH_LOGIN_REQUESTED, login),
        takeLatest(AuthActionTypes.AUTH_LOGIN_FAILED, loginFailed),
        takeLatest(AuthActionTypes.AUTH_LOGOUT_REQUESTED, logout),
        takeLatest(AuthActionTypes.AUTH_LOGOUT_SUCCEEDED, logoutSucceeded),
        takeLatest(AuthActionTypes.AUTH_ACCESS_TOKEN_SET, setAccessToken),
        takeLatest(
          AuthActionTypes.AUTH_LOGIN_NEW_PASSWORD_CHALLENGE_REQUESTED,
          newPasswordChallengeRequested
        ),
        takeLatest(
          AuthActionTypes.AUTH_LOGIN_NEW_PASSWORD_CHALLENGE_SUCCEEDED,
          newPasswordChallengeSucceeded
        ),
        takeLatest(AuthActionTypes.AUTH_RESET_PASSWORD_REQUESTED, resetPassword),
        takeLatest(AuthActionTypes.AUTH_RESET_PASSWORD_FAILED, resetPasswordFailed),
        takeLatest(AuthActionTypes.AUTH_RESET_PASSWORD_SUCCEEDED, resetPasswordSucceeded),
        takeLatest(AuthActionTypes.AUTH_SESSION_BOOTSTRAP_REQUESTED, bootstrapRequested)
      ])
      .finish()
      .isDone();
  });

  describe("login saga", () => {
    it("dispatch the correct action when login succeeds for admins", () => {
      return expectSaga(
        login,
        actions.loginRequested(userPasswordMock.email, userPasswordMock.password)
      )
        .provide([
          [
            call(cognito.authenticateUser, userPasswordMock.email, userPasswordMock.password),
            cognitoSessionMock
          ],
          [select(getI18nLanguage), adminUserMock.locale],
          [
            call(api.user.getCurrent, adminUserMock.email, adminUserMock.locale),
            { data: adminUserMock }
          ]
        ])
        .put(actions.setAccessToken(cognitoSessionMock.accessToken.jwtToken))
        .put(actions.loginSucceeded(adminUserMock))
        .put(push(restrictedRoutes.users.path))
        .run();
    });

    it("dispatch the correct action when login succeeds for non-admins", () => {
      return expectSaga(
        login,
        actions.loginRequested(userPasswordMock.email, userPasswordMock.password)
      )
        .provide([
          [
            call(cognito.authenticateUser, userPasswordMock.email, userPasswordMock.password),
            cognitoSessionMock
          ],
          [select(getI18nLanguage), userMock.locale],
          [call(api.user.getCurrent, userMock.email, userMock.locale), { data: userMock }]
        ])
        .put(actions.setAccessToken(cognitoSessionMock.accessToken.jwtToken))
        .put(actions.loginSucceeded(userMock))
        .put(push(restrictedRoutes.users.path))
        .run();
    });

    it("dispatch newPasswordRequired action when cognito throw an error", () => {
      return expectSaga(
        login,
        actions.loginRequested(userPasswordMock.email, userPasswordMock.password)
      )
        .provide({
          call(effect, next) {
            if (effect.fn === cognito.authenticateUser) {
              // eslint-disable-next-line no-throw-literal
              throw { newPasswordRequired: true };
            }
            return next();
          }
        })
        .put(actions.newPasswordRequired(userPasswordMock.email))
        .run();
    });

    it("dispatch loginFailed when an unkown exception is thrown", () => {
      return expectSaga(
        login,
        actions.loginRequested(userPasswordMock.email, userPasswordMock.password)
      )
        .provide([[matchers.call.fn(cognito.authenticateUser), throwError(new Error())]])
        .put(actions.loginFailed(new Error()))
        .run();
    });
  });

  describe("setSession saga", () => {
    it("saves the token correctly to the local storage", () => {
      testSaga(setAccessToken, actions.setAccessToken("foo"))
        .next()
        .finish()
        .isDone();
      expect(api.instance.defaults.headers.common.Authorization).toBe(`Bearer foo`);
    });
  });

  describe("loginFailed saga", () => {
    it("Should show error message only when new password is not required", () => {
      testSaga(loginFailed, actions.loginFailed({ newPasswordRequired: true }))
        .next()
        .finish()
        .isDone();

      testSaga(loginFailed, actions.loginFailed({ newPasswordRequired: false }))
        .next()
        .put(error("error"))
        .finish()
        .isDone();
    });
  });

  describe("logout saga", () => {
    it("clear the token on localStorage", () => {
      return expectSaga(logout, actions.logoutRequested())
        .provide([[call(cognito.logout), authMock]])
        .put(actions.logoutSucceeded(authMock))
        .run();
    });

    it("fails on the log out request", () => {
      return expectSaga(logout, actions.logoutRequested())
        .provide([[matchers.call.fn(cognito.logout), throwError(new Error())]])
        .put(actions.logoutFailed(new Error()))
        .run();
    });
  });

  describe("logoutSucceeded saga", () => {
    it("redirects user to the right route on logout", () => {
      testSaga(logoutSucceeded)
        .next()
        .next()
        .put(push(restrictedRoutes.home.path))
        .finish()
        .isDone();
    });

    it("logs out the user", () => {
      expect(api.instance.defaults.headers.common.Authorization).toBe(undefined);
    });
  });

  describe("newPasswordChallengeRequested", () => {
    it("dispatch the correct action when succeeds", () => {
      return expectSaga(newPasswordChallengeRequested, actions.newPasswordChallengeRequested("foo"))
        .provide([
          [select(getAuthEmail), adminUserMock.email],
          [select(getI18nLanguage), adminUserMock.locale],
          [call(cognito.completeNewPasswordChallenge, "foo"), cognitoSessionMock],
          [
            call(api.user.getCurrent, adminUserMock.email, adminUserMock.locale),
            { data: adminUserMock }
          ]
        ])
        .put(actions.setAccessToken(cognitoSessionMock.accessToken.jwtToken))
        .put(actions.loginSucceeded(adminUserMock))
        .put(actions.newPasswordChallengeSucceeded())
        .run();
    });

    it("dispatch failed action when request fails", () => {
      return expectSaga(newPasswordChallengeRequested, actions.newPasswordChallengeRequested("foo"))
        .provide([
          [matchers.call.fn(cognito.completeNewPasswordChallenge), throwError(new Error())]
        ])
        .put(actions.newPasswordChallengeFailed(new Error()))
        .run();
    });
  });

  describe("newPasswordChallengeSucceeded", () => {
    it("dispatch login succeeded action", () => {
      testSaga(newPasswordChallengeSucceeded, actions.newPasswordChallengeSucceeded())
        .next()
        .put(push(restrictedRoutes.users.path))
        .next()
        .put(success("success"))
        .finish()
        .isDone();
    });
  });

  describe("bootstrapRequested saga", () => {
    it("succeed for admins when no errors are triggerd", () => {
      return expectSaga(bootstrapRequested, actions.bootstrapSessionRequested)
        .provide([
          [call(cognito.getSession), cognitoSessionMock],
          [select(getAuthEmail), adminUserMock.email],
          [select(getI18nLanguage), adminUserMock.locale],
          [call(api.user.getCurrent), { data: adminUserMock }]
        ])
        .put(actions.setAccessToken(cognitoSessionMock.accessToken.jwtToken))
        .put(actions.loginSucceeded(adminUserMock))
        .put(actions.bootstrapSessionSucceeded())
        .run();
    });

    it("succeed for non-admins when no errors are triggerd", () => {
      return expectSaga(bootstrapRequested, actions.bootstrapSessionRequested)
        .provide([
          [call(cognito.getSession), cognitoSessionMock],
          [select(getAuthEmail), userMock.email],
          [select(getI18nLanguage), userMock.locale],
          [call(api.user.getCurrent), { data: userMock }]
        ])
        .put(actions.setAccessToken(cognitoSessionMock.accessToken.jwtToken))
        .put(actions.loginSucceeded(userMock))
        .put(actions.bootstrapSessionSucceeded())
        .run();
    });

    it("fail when session is not valid", () => {
      const mock = { ...cognitoSessionMock, isValid: () => false };
      return expectSaga(bootstrapRequested, actions.bootstrapSessionRequested)
        .provide([[call(cognito.getSession), mock]])
        .put(actions.bootstrapSessionFailed())
        .run();
    });

    it("fails on the bootstrap session request", () => {
      return expectSaga(bootstrapRequested, actions.bootstrapSessionRequested())
        .provide([[matchers.call.fn(cognito.getSession), throwError(new Error())]])
        .put(actions.bootstrapSessionFailed())
        .run();
    });
  });

  describe("resetPassword saga", () => {
    it("succeeds when no errors are triggered", () => {
      return expectSaga(
        resetPassword,
        actions.resetPasswordRequested(
          userMockResetPassword.username,
          userMockResetPassword.password,
          userMockResetPassword.pin
        )
      )
        .provide([[matchers.call.fn(cognito.changePassword), {}]])
        .put(actions.resetPasswordSucceeded())
        .run();
    });

    it("dispatches a failed action when the request fails", () => {
      return expectSaga(
        resetPassword,
        actions.resetPasswordRequested(
          userMockResetPassword.username,
          userMockResetPassword.password,
          userMockResetPassword.pin
        )
      )
        .provide([[matchers.call.fn(cognito.changePassword), throwError(new Error())]])
        .put(actions.resetPasswordFailed(new Error()))
        .run();
    });

    it("redirects the route on reset password succeeded", () => {
      testSaga(resetPasswordSucceeded)
        .next()
        .put(success("success"))
        .next()
        .put(push(publicRoutes.login.path))
        .finish()
        .isDone();
    });

    it("fails with and error message", () => {
      testSaga(resetPasswordFailed, actions.resetPasswordFailed(""))
        .next()
        .put(error("error"))
        .finish()
        .isDone();
    });
  });

  describe("getAuthEmail", () => {
    it("return email from store", () => {
      expect(getAuthEmail(stateMock)).toEqual(stateMock.auth.email);
    });
  });

  describe("getI18nLanguage", () => {
    it("return language from store", () => {
      expect(getI18nLanguage(stateMock)).toEqual(stateMock.i18n.language);
    });
  });
});
