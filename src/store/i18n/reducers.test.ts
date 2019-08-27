import { i18nReducer, initialState } from "./reducers";
import { I18nActionTypes } from "./types";

describe("i18n reducer", () => {
  it("should update the state with new language", () => {
    const state = i18nReducer(initialState, {
      payload: "it",
      type: I18nActionTypes.I18N_CHANGE_LANGUAGE_SUCCEEDED
    });
    expect(state).toEqual({ ...initialState, language: "it" });
  });

  it("should return the initial state in case of an unmapped action type", () => {
    const state = i18nReducer(initialState, {
      payload: { items: "xyz" },
      type: "UNKNOWN"
    });
    expect(state).toEqual(initialState);
  });

  it("should return the initial state in case any action is passed", () => {
    const state = i18nReducer(undefined, { type: null });
    expect(state).toEqual(initialState);
  });
});
