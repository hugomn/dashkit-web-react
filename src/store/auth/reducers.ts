import produce from "immer";
import { Reducer } from "redux";
import { AuthActionTypes, IAuthState } from "./types";

export const initialState: IAuthState = {
  isLoggedIn: false,
  isSessionBootstrapped: false
};

const reducer: Reducer<IAuthState> = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case AuthActionTypes.AUTH_LOGIN_SUCCEEDED:
        draft.user = action.payload;
        draft.isLoggedIn = true;
        draft.error = undefined;
        break;
      case AuthActionTypes.AUTH_LOGIN_FAILED:
        draft.isLoggedIn = false;
        draft.error = action.payload;
        break;
      case AuthActionTypes.AUTH_LOGOUT_SUCCEEDED:
        draft.isLoggedIn = false;
        draft.error = undefined;
        break;
      case AuthActionTypes.AUTH_LOGOUT_FAILED:
        draft.error = action.payload;
        break;
      case AuthActionTypes.AUTH_LOGIN_NEW_PASSWORD_REQUIRED:
        draft.isLoggedIn = false;
        draft.newPasswordRequired = true;
        draft.email = action.payload;
        draft.error = undefined;
        break;
      case AuthActionTypes.AUTH_LOGIN_NEW_PASSWORD_CHALLENGE_SUCCEEDED:
        draft.isLoggedIn = true;
        draft.newPasswordRequired = undefined;
        draft.error = undefined;
        break;
      case AuthActionTypes.AUTH_RESET_PASSWORD_SUCCEEDED:
        draft.error = undefined;
        break;
      case AuthActionTypes.AUTH_RESET_PASSWORD_FAILED:
        draft.error = action.payload;
        break;
      case AuthActionTypes.AUTH_SESSION_VALIDATED:
        draft.isLoggedIn = true;
        draft.error = undefined;
        break;
      case AuthActionTypes.AUTH_SESSION_BOOTSTRAP_FAILED:
      case AuthActionTypes.AUTH_SESSION_BOOTSTRAP_SUCCEEDED:
        draft.isSessionBootstrapped = true;
        break;
      default:
        break;
    }
  });
};

export default reducer;
