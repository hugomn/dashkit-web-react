import { push } from "connected-react-router";
import i18n from "i18next";
import { error, success } from "react-toastify-redux";
import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { publicRoutes, restrictedRoutes } from "../../constants/routes";
import api from "../../service/api";
import cognito from "../../service/cognito";
import actions from "./actions";
import { AuthActionTypes } from "./types";
import { IApplicationState } from "..";

export const getAuthEmail = (state: IApplicationState) => state.auth.email;
export const getI18nLanguage = (state: IApplicationState) => state.i18n.language;

export function* bootstrapRequested() {
  try {
    const session = yield call(cognito.getSession);
    if (session && session.isValid()) {
      yield put(actions.setAccessToken(session.accessToken.jwtToken));
      const user = yield call(api.user.getCurrent);
      yield put(actions.loginSucceeded(user.data));
      yield put(actions.bootstrapSessionSucceeded());
    } else {
      yield put(actions.logoutRequested());
      yield put(actions.bootstrapSessionFailed());
    }
  } catch (err) {
    yield put(actions.logoutRequested());
    yield put(actions.bootstrapSessionFailed());
  }
}

export function* login(action: ReturnType<typeof actions.loginRequested>) {
  const { email, password } = action.payload;
  try {
    const session = yield call(cognito.authenticateUser, email, password);
    yield put(actions.setAccessToken(session.accessToken.jwtToken));
    const locale = yield select(getI18nLanguage);
    const user = yield call(api.user.getCurrent, email, locale);
    yield put(actions.loginSucceeded(user.data));
    yield put(push(restrictedRoutes.users.path));
  } catch (err) {
    yield put(actions.loginFailed(err));
    if (err.newPasswordRequired) {
      yield put(actions.newPasswordRequired(email));
    }
  }
}

export function* setAccessToken(action: ReturnType<typeof actions.setAccessToken>) {
  yield (api.instance.defaults.headers.common.Authorization = `Bearer ${action.payload}`);
}

export function* loginFailed(action: ReturnType<typeof actions.loginFailed>) {
  if (!action.payload.newPasswordRequired) {
    yield put(error(i18n.t("pages.login.form.error.invalid")));
  }
}

export function* logout() {
  try {
    const res = yield call(cognito.logout);
    yield put(actions.logoutSucceeded(res));
  } catch (err) {
    yield put(actions.logoutFailed(err));
  }
}

export function* logoutSucceeded() {
  yield (api.instance.defaults.headers.common.Authorization = undefined);
  yield put(push(restrictedRoutes.home.path));
}

export function* newPasswordChallengeRequested(
  action: ReturnType<typeof actions.newPasswordChallengeRequested>
) {
  try {
    const session = yield call(cognito.completeNewPasswordChallenge, action.payload.newPassword);
    yield put(actions.setAccessToken(session.accessToken.jwtToken));
    const email = yield select(getAuthEmail);
    const locale = yield select(getI18nLanguage);
    const { data } = yield call(api.user.getCurrent, email, locale);
    yield put(actions.loginSucceeded(data));
    yield put(actions.newPasswordChallengeSucceeded());
  } catch (err) {
    yield put(actions.newPasswordChallengeFailed(err));
  }
}

export function* newPasswordChallengeSucceeded() {
  yield put(push(restrictedRoutes.users.path));
  yield put(success(i18n.t("pages.login.newpassword.form.success")));
}

export function* resetPassword(action: ReturnType<typeof actions.resetPasswordRequested>) {
  try {
    const { email, password, pin } = action.payload;
    yield call(cognito.changePassword, email, password, pin);
    yield put(actions.resetPasswordSucceeded());
  } catch (err) {
    yield put(actions.resetPasswordFailed(err));
  }
}

export function* resetPasswordFailed(action: ReturnType<typeof actions.resetPasswordFailed>) {
  yield put(error(action.payload.message));
}

export function* resetPasswordSucceeded() {
  yield put(success(i18n.t("pages.login.newpassword.form.success")));
  yield put(push(publicRoutes.login.path));
}

function* sagas() {
  yield all([
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
  ]);
}

export default sagas;
