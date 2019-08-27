import { action } from "typesafe-actions";
import { I18nActionTypes } from "./types";

export const changeLanguage = (language: string) =>
  action(I18nActionTypes.I18N_CHANGE_LANGUAGE_REQUESTED, language);
export const changeLanguageSucceeded = (language: string) =>
  action(I18nActionTypes.I18N_CHANGE_LANGUAGE_SUCCEEDED, language);
export const changeLanguageFailed = (message: string) =>
  action(I18nActionTypes.I18N_CHANGE_LANGUAGE_FAILED, message);
