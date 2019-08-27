import axios from "axios";
import { store } from "../store";
import actions from "../store/api/actions";
import authActions from "../store/auth/actions";
import { IPageable, ISortParams, IUser } from "../store/users/types";
import cognito from "./cognito";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 0 // no timeout
});

export const createUser = (email: IUser["email"], locale: IUser["locale"]) => {
  return instance.post(`/users`, { email, locale });
};

export const getCurrentUser = (email?: IUser["email"], locale?: IUser["locale"]) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve, reject) => {
    try {
      const response = await instance.get(`/users/me`);
      resolve(response);
    } catch (err) {
      if (err.response && err.response.status === 500 && (!!email && !!locale)) {
        const responseCreate = await createUser(email, locale);
        resolve(responseCreate);
      } else {
        reject(err);
      }
    }
  });

const api = {
  user: {
    create: createUser,
    getAll: (params: IPageable) => {
      return instance.get(`/users?${serialize(params)}`);
    },
    getCurrent: getCurrentUser
  }
};

export const interceptResponse: any = {
  error: (error: any) => {
    const originalRequest = error.config;
    const res = error.response;
    if (res.status === 401 && !originalRequest._isRetry) {
      return cognito.getSession().then(
        (session: any) => {
          if (session && session.isValid()) {
            store.dispatch(authActions.setAccessToken(session.accessToken.jwtToken));
            originalRequest._isRetry = true;
            originalRequest.headers.Authorization = `Bearer ${session.accessToken.jwtToken}`;
            return instance.request(originalRequest);
          }
          return Promise.reject(error);
        },
        () => {
          store.dispatch(actions.apiRequestFailed(res));
          return Promise.reject(error);
        }
      );
    }
    store.dispatch(actions.apiRequestFailed(res));
    return Promise.reject(error);
  },
  response: (response: any) => {
    return response;
  }
};

// TODO: Refactor to have api configs in a separate file
instance.interceptors.response.use(interceptResponse.response, interceptResponse.error);

export const getSortStringParam = (sort: ISortParams): string => {
  const { ascending, sortProperty, property } = sort;
  return (sortProperty || property) + (ascending ? ",asc" : ",desc");
};

export const serialize = (obj?: object) => {
  return obj
    ? Object.keys(obj)
        .filter(k => obj[k] != null)
        .map(k => `${k}=${encodeURIComponent(obj[k])}`)
        .join("&")
    : "";
};

export default { instance, interceptResponse, ...api };
