import produce from "immer";
import { Reducer } from "redux";
import { IUsersState, UsersActionTypes } from "./types";

export const initialState: IUsersState = {
  isLoading: false,
  users: undefined
};

const reducer: Reducer<IUsersState> = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case UsersActionTypes.USERS_FETCH_ALL_FAILED:
        draft.isLoading = false;
        break;
      case UsersActionTypes.USERS_FETCH_ALL_REQUESTED:
        draft.isLoading = true;
        break;
      case UsersActionTypes.USERS_FETCH_ALL_SUCCEEDED:
        draft.isLoading = false;
        draft.users = action.payload;
        break;
      default:
        break;
    }
  });
};

export default reducer;
