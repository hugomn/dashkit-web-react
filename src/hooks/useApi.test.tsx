import { renderHook } from "@testing-library/react-hooks";
import Axios from "axios";
import api from "../service/api";
import { promiseResponseMock } from "../tests/mocks/api";
import { usersMock } from "../tests/mocks/user";
import useApi from "./useApi";

const apiInstance = api.instance as jest.Mocked<typeof Axios>;

describe("useApi hook", () => {
  it("should return response properly", async () => {
    apiInstance.get.mockResolvedValueOnce({
      data: usersMock,
      ...promiseResponseMock
    });
    const { result, waitForNextUpdate } = renderHook(() => useApi(api.user.getAll, []));
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.response.data).toEqual(usersMock);
  });

  it("should return error in case the api call fails", async () => {
    // eslint-disable-next-line prefer-promise-reject-errors
    apiInstance.get.mockImplementationOnce(() => Promise.reject("foo"));
    const { result, waitForNextUpdate } = renderHook(() => useApi(api.user.getAll, []));
    expect(result.current.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toEqual("foo");
  });
});
