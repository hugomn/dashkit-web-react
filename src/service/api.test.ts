import axios from "axios";
import { promiseResponseMock } from "../tests/mocks/api";
import { adminUserMock } from "../tests/mocks/store";
import api, { getSortStringParam, interceptResponse, serialize } from "./api";
import cognito from "./cognito";

const apiInstance = api.instance as jest.Mocked<typeof axios>;

describe("API Service", () => {
  let getCounter = 0;
  let postCounter = 0;
  const mockDelete = jest.fn();
  const mockGet = jest.fn();
  const mockPatch = jest.fn();
  const mockPost = jest.fn();
  api.instance.delete = mockDelete;
  api.instance.get = mockGet;
  api.instance.patch = mockPatch;
  api.instance.post = mockPost;

  describe("User service", () => {
    it("create should do the correct get call", async () => {
      await api.user.create(adminUserMock.email, adminUserMock.locale);
      expect(mockPost).toBeCalledTimes(++postCounter);
      expect(mockPost).lastCalledWith(`/users`, {
        email: adminUserMock.email,
        locale: adminUserMock.locale
      });
    });

    it("getCurrent should do the correct get call", async () => {
      apiInstance.get.mockResolvedValueOnce({
        data: { ...adminUserMock },
        ...promiseResponseMock
      });
      const response: any = await api.user.getCurrent();
      expect(mockGet).toBeCalledTimes(++getCounter);
      expect(mockGet).lastCalledWith(`/users/me`);
      expect(response.data).toEqual(adminUserMock);
    });

    it("getCurrent should create a new user when user doesn't exist", async () => {
      apiInstance.get.mockImplementationOnce(() => {
        // eslint-disable-next-line no-throw-literal
        throw { response: { status: 404 } };
      });
      apiInstance.post.mockResolvedValueOnce({
        data: { ...adminUserMock },
        ...promiseResponseMock
      });
      const response: any = await api.user.getCurrent(adminUserMock.email, adminUserMock.locale);
      expect(mockGet).toBeCalledTimes(++getCounter);
      expect(mockPost).toBeCalledTimes(++postCounter);
      expect(response.data).toEqual(adminUserMock);
    });

    it("getCurrent should reject", async () => {
      const error = { response: { status: 501 } };
      apiInstance.get.mockImplementationOnce(() => {
        throw error;
      });
      try {
        await api.user.getCurrent(adminUserMock.email, adminUserMock.locale);
      } catch (err) {
        expect(err).toBe(error);
      }
    });
  });

  describe("interceptResponse error method", () => {
    it("if error status is not 403, should dispatch apiRequestFailed", async () => {
      const errorMock = { response: { status: 500 } };
      await expect(interceptResponse.error(errorMock)).rejects.toBe(errorMock);
    });

    it("if error status is 403, the request should be called again and resolve if session is valid", async () => {
      const errorMock = { config: { headers: {} }, response: { status: 401 } };
      await expect(interceptResponse.error(errorMock)).toBeTruthy();
    });

    it("if error status is 403 and but session is not valid", async () => {
      cognito.getSession = jest
        .fn()
        .mockImplementationOnce(() =>
          Promise.resolve({ accessToken: { jwtToken: "fakeToken" }, isValid: () => false })
        );
      const errorMock = { config: {}, response: { status: 401 } };
      await expect(interceptResponse.error(errorMock)).rejects.toBe(errorMock);
    });

    it("if error status is 403 and no session is available it should reject", async () => {
      // eslint-disable-next-line prefer-promise-reject-errors
      cognito.getSession = jest.fn().mockImplementationOnce(() => Promise.reject({ data: {} }));
      const errorMock = { config: {}, response: { status: 401 } };
      await expect(interceptResponse.error(errorMock)).rejects.toBe(errorMock);
    });
  });

  describe("interceptResponse response method", () => {
    it("Return the correct response", async () => {
      const responseMock = { response: { status: 200 } };
      await expect(interceptResponse.response(responseMock)).toBe(responseMock);
    });
  });

  describe("Serialize method", () => {
    it("returns the correct serialized string", () => {
      const query = serialize({ page: 0, size: 25 });
      expect(query).toEqual("page=0&size=25");
    });

    it("ignores null and undefined parameters", () => {
      const query = serialize({ page: 0, foo: null, bar: undefined });
      expect(query).toEqual("page=0");
    });

    it("return empty string when no params are passed", () => {
      const query = serialize();
      expect(query).toEqual("");
    });
  });

  describe("getSortStringParam method", () => {
    it("returns the correct parameter", () => {
      const sort = getSortStringParam({ ascending: true, property: "id" });
      expect(sort).toBe("id,asc");
    });

    it("returns the correct parameter when sortProperty and descending", () => {
      const sort = getSortStringParam({
        ascending: false,
        property: "id",
        sortProperty: "latestId"
      });
      expect(sort).toBe("latestId,desc");
    });
  });
});
