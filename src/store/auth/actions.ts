import { action } from "typesafe-actions";
import { IUser } from "../users/types";
import { AuthActionTypes, IAuthState } from "./types";

const actions = {
  bootstrapSessionFailed: () => action(AuthActionTypes.AUTH_SESSION_BOOTSTRAP_FAILED),
  bootstrapSessionRequested: () => action(AuthActionTypes.AUTH_SESSION_BOOTSTRAP_REQUESTED),
  bootstrapSessionSucceeded: () => action(AuthActionTypes.AUTH_SESSION_BOOTSTRAP_SUCCEEDED),
  loginFailed: (error: any) => action(AuthActionTypes.AUTH_LOGIN_FAILED, error),
  loginRequested: (email: string, password: string) =>
    action(AuthActionTypes.AUTH_LOGIN_REQUESTED, { email, password }),
  loginSucceeded: (user: IUser) => action(AuthActionTypes.AUTH_LOGIN_SUCCEEDED, user),
  logoutFailed: (error: any) => action(AuthActionTypes.AUTH_LOGOUT_FAILED, error),
  logoutRequested: () => action(AuthActionTypes.AUTH_LOGOUT_REQUESTED),
  logoutSucceeded: (auth: IAuthState) => action(AuthActionTypes.AUTH_LOGOUT_SUCCEEDED, auth),
  newPasswordChallengeFailed: (error: any) =>
    action(AuthActionTypes.AUTH_LOGIN_NEW_PASSWORD_CHALLENGE_FAILED, error),
  newPasswordChallengeRequested: (newPassword: string) =>
    action(AuthActionTypes.AUTH_LOGIN_NEW_PASSWORD_CHALLENGE_REQUESTED, {
      newPassword
    }),
  newPasswordChallengeSucceeded: () =>
    action(AuthActionTypes.AUTH_LOGIN_NEW_PASSWORD_CHALLENGE_SUCCEEDED),
  newPasswordRequired: (email: string) =>
    action(AuthActionTypes.AUTH_LOGIN_NEW_PASSWORD_REQUIRED, email),
  resetPasswordFailed: (error: any) => action(AuthActionTypes.AUTH_RESET_PASSWORD_FAILED, error),
  resetPasswordRequested: (email: string, password: string, pin: string) =>
    action(AuthActionTypes.AUTH_RESET_PASSWORD_REQUESTED, { email, password, pin }),
  resetPasswordSucceeded: () => action(AuthActionTypes.AUTH_RESET_PASSWORD_SUCCEEDED),
  setAccessToken: (token: string) => action(AuthActionTypes.AUTH_ACCESS_TOKEN_SET, token)
};

export default actions;
