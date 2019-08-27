import { action } from "typesafe-actions";
import { IPageable, IUser, UsersActionTypes } from "./types";

const actions = {
  fetchAllFailed: (error: Error) => action(UsersActionTypes.USERS_FETCH_ALL_FAILED, error),
  fetchAllRequested: (params?: IPageable) =>
    action(UsersActionTypes.USERS_FETCH_ALL_REQUESTED, params),
  fetchAllSucceeded: (users: IUser[]) => action(UsersActionTypes.USERS_FETCH_ALL_SUCCEEDED, users)
};

export default actions;
