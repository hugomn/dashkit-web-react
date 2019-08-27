import i18n from "i18next";
import { error } from "react-toastify-redux";
import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "../../service/api";
import { UsersActionTypes } from "./types";
import actions from "./actions";

export function* fetchAllRequested(action: ReturnType<typeof actions.fetchAllRequested>) {
  try {
    const { page = 0 } = action.payload || {};
    const {
      data: { content }
    } = yield call(api.user.getAll, { page });
    yield put(actions.fetchAllSucceeded(content));
  } catch (err) {
    yield put(actions.fetchAllFailed(err));
  }
}

export function* fetchAllFailed() {
  yield put(error(i18n.t("global.error.loading.server")));
}

function* sagas() {
  yield all([
    takeLatest(UsersActionTypes.USERS_FETCH_ALL_FAILED, fetchAllFailed),
    takeLatest(UsersActionTypes.USERS_FETCH_ALL_REQUESTED, fetchAllRequested)
  ]);
}

export default sagas;
