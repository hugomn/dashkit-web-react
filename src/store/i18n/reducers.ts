import produce from "immer";
import { Reducer } from "redux";
import { I18nActionTypes, II18nState } from "./types";

export const initialState: II18nState = {
  language: "en"
};

const reducer: Reducer<II18nState> = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case I18nActionTypes.I18N_CHANGE_LANGUAGE_SUCCEEDED:
        draft.language = action.payload;
        break;
      default:
    }
  });
};

export { reducer as i18nReducer };
