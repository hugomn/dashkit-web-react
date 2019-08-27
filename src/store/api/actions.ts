import { action } from "typesafe-actions";
import { ApiActionTypes } from "./types";

const actions = {
  apiRequestFailed: (error: any) => action(ApiActionTypes.API_REQUEST_FAILED, error)
};

export default actions;
