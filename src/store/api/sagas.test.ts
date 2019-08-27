import { testSaga } from "redux-saga-test-plan";
import { takeLatest } from "redux-saga/effects";
import authActions from "../auth/actions";
import actions from "./actions";
import sagas, { apiRequestFailed } from "./sagas";
import { ApiActionTypes } from "./types";

describe("Apis saga", () => {
  it("call the correct saga for dispatched actions", () => {
    testSaga(sagas)
      .next()
      .all([takeLatest(ApiActionTypes.API_REQUEST_FAILED, apiRequestFailed)])
      .finish()
      .isDone();
  });

  describe("apiRequestFailed saga", () => {
    it("Should logout user when error status is 401", () => {
      testSaga(apiRequestFailed, actions.apiRequestFailed({ status: 401 }))
        .next()
        .put(authActions.logoutRequested())
        .finish()
        .isDone();
    });

    it("Should not logout user when error status is not 403", () => {
      testSaga(apiRequestFailed, actions.apiRequestFailed({ status: 500 }))
        .next()
        .finish()
        .isDone();
    });
  });
});
