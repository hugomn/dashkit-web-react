import i18n from "i18next";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import { takeLatest } from "redux-saga/effects";
import * as actions from "./actions";
import sagas, { changeLanguage } from "./sagas";
import { I18nActionTypes } from "./types";

describe("User saga", () => {
  it("call the correct saga for dispatched actions", () => {
    testSaga(sagas)
      .next()
      .all([takeLatest(I18nActionTypes.I18N_CHANGE_LANGUAGE_REQUESTED, changeLanguage)])
      .finish()
      .isDone();
  });

  it("calls the i18n lib when the saga yields", () => {
    return expectSaga(changeLanguage, actions.changeLanguage("it"))
      .provide({
        call({ fn }) {
          return fn === i18n.changeLanguage;
        }
      })
      .put(actions.changeLanguageSucceeded("it"))
      .run();
  });

  it("handles errors properly", () => {
    const error = new Error("error");
    return expectSaga(changeLanguage, actions.changeLanguage("it"))
      .provide([[matchers.call.fn(i18n.changeLanguage), throwError(error)]])
      .put(actions.changeLanguageFailed(error.message))
      .run();
  });
});
