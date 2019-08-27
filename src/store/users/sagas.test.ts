import { error } from "react-toastify-redux";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import { call, takeLatest } from "redux-saga/effects";
import api from "../../service/api";
import { usersMock } from "../../tests/mocks/user";
import actions from "./actions";
import sagas, { fetchAllFailed, fetchAllRequested } from "./sagas";
import { UsersActionTypes } from "./types";

describe("Users saga", () => {
  it("call the correct saga for dispatched actions", () => {
    testSaga(sagas)
      .next()
      .all([
        takeLatest(UsersActionTypes.USERS_FETCH_ALL_FAILED, fetchAllFailed),
        takeLatest(UsersActionTypes.USERS_FETCH_ALL_REQUESTED, fetchAllRequested)
      ])
      .finish()
      .isDone();
  });

  describe("fetchAllRequested saga", () => {
    it("dispatch the correct action when succeeds", () => {
      return expectSaga(fetchAllRequested, actions.fetchAllRequested())
        .provide([
          [
            call(api.user.getAll, {
              page: 0
            }),
            { data: { content: usersMock, totalElements: usersMock.length, totalPages: 0 } }
          ]
        ])
        .put(actions.fetchAllSucceeded(usersMock))
        .run();
    });

    it("dispatch fetchAllFailed when an unkown exception is thrown", () => {
      return expectSaga(fetchAllRequested, actions.fetchAllRequested({ page: 0 }))
        .provide([[matchers.call.fn(api.user.getAll), throwError(new Error())]])
        .put(actions.fetchAllFailed(new Error()))
        .run();
    });
  });

  describe("fetchAllFailed saga", () => {
    it("Should show error message", () => {
      testSaga(fetchAllFailed, actions.fetchAllFailed(new Error()))
        .next()
        .put(error("error"))
        .finish()
        .isDone();
    });
  });
});
