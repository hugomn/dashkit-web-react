import i18n from "i18next";
import { all, call, put, takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import { I18nActionTypes } from "./types";

export function* changeLanguage(action: ReturnType<typeof actions.changeLanguage>) {
  try {
    yield call([i18n, "changeLanguage"], action.payload);
    yield put(actions.changeLanguageSucceeded(action.payload));
  } catch (err) {
    yield put(actions.changeLanguageFailed(err.message));
  }
}

function* sagas() {
  yield all([takeLatest(I18nActionTypes.I18N_CHANGE_LANGUAGE_REQUESTED, changeLanguage)]);
}

export default sagas;
