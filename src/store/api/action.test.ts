import actions from "./actions";
import { ApiActionTypes } from "./types";

describe("API actions", () => {
  it("requestFailed should return the correct action type", () => {
    expect(actions.apiRequestFailed("").type).toEqual(ApiActionTypes.API_REQUEST_FAILED);
  });
});
