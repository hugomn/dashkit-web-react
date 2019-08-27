import { all, put, takeLatest } from "redux-saga/effects";
import authActions from "../auth/actions";
import actions from "./actions";
import { ApiActionTypes } from "./types";

export function* apiRequestFailed(action: ReturnType<typeof actions.apiRequestFailed>) {
  if (action.payload.status === 401) {
    yield put(authActions.logoutRequested());
  }
}

function* sagas() {
  yield all([takeLatest(ApiActionTypes.API_REQUEST_FAILED, apiRequestFailed)]);
}

export default sagas;
