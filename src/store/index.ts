import * as Sentry from "@sentry/browser";
import { RouterState, connectRouter, routerMiddleware } from "connected-react-router";
import { History, createBrowserHistory } from "history";
import { loadingBarMiddleware, loadingBarReducer } from "react-redux-loading-bar";
import { toastsReducer as toasts } from "react-toastify-redux";
import { Action, AnyAction, applyMiddleware, combineReducers, createStore, Dispatch } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { all, fork } from "redux-saga/effects";
import createSentryMiddleware from "redux-sentry-middleware";
import apiSaga from "./api/sagas";
import authReducer from "./auth/reducers";
import authSaga from "./auth/sagas";
import { IAuthState, AuthActionTypes } from "./auth/types";
import { i18nReducer } from "./i18n/reducers";
import i18nSaga from "./i18n/sagas";
import { II18nState } from "./i18n/types";
import usersReducer from "./users/reducers";
import usersSaga from "./users/sagas";
import { IUsersState } from "./users/types";

// The top-level state object
export interface IApplicationState {
  auth: IAuthState;
  users: IUsersState;
  i18n: II18nState;
  loadingBar: any;
  router: RouterState;
  toasts: any;
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface IConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>;
}

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN, environment: process.env.REACT_APP_ENV });

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({});
const initialState = window.initialReduxState;

const browserHistory: History = createBrowserHistory({ basename: "/" });

const combinedReducer = (history: History) =>
  combineReducers<IApplicationState>({
    auth: authReducer,
    users: usersReducer,
    i18n: i18nReducer,
    loadingBar: loadingBarReducer,
    router: connectRouter(history),
    toasts
  });

const rootReducer = (history: History) => (state: IApplicationState | undefined, action: any) => {
  let newState = state;
  if (state && action.type === AuthActionTypes.AUTH_LOGOUT_SUCCEEDED) {
    newState = { ...initialState, auth: { ...state.auth, isSessionBootstrapped: true } };
  }
  return combinedReducer(history)(newState, action);
};

const store = createStore(
  rootReducer(browserHistory),
  initialState,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(browserHistory),
      sagaMiddleware,
      createSentryMiddleware(Sentry),
      loadingBarMiddleware({
        promiseTypeSuffixes: ["REQUESTED", "SUCCEEDED", "FAILED"]
      })
    )
  )
);
sagaMiddleware.run(rootSaga);

/* istanbul ignore next */
if ((window as any).Cypress) {
  (window as any).store = store;
}

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
function* rootSaga() {
  yield all([fork(apiSaga), fork(authSaga), fork(usersSaga), fork(i18nSaga)]);
}

export { combinedReducer, rootReducer, browserHistory as history, rootSaga, store };
