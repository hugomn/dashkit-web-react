import * as actions from "./actions";
import { I18nActionTypes } from "./types";

describe("User actions", () => {
  it("changeLanguage should return the correct action type", () => {
    expect(actions.changeLanguage("it").type).toEqual(
      I18nActionTypes.I18N_CHANGE_LANGUAGE_REQUESTED
    );
  });
  it("changeLanguageSucceeded should return the correct action type", () => {
    expect(actions.changeLanguageSucceeded("it").type).toEqual(
      I18nActionTypes.I18N_CHANGE_LANGUAGE_SUCCEEDED
    );
  });
  it("changeLanguageFailed should return the correct action type", () => {
    expect(actions.changeLanguageFailed("").type).toEqual(
      I18nActionTypes.I18N_CHANGE_LANGUAGE_FAILED
    );
  });
});
