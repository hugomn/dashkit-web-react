import { IAuthState } from "../../store/auth/types";
import { IPageable, IUser, UserRoles, IUsersState } from "../../store/users/types";
import { IApplicationState } from "../../store";
import { usersMock } from "./user";
import routeComponentMock from "./route";

export const adminUserMock: IUser = {
  email: "max.mustermann@bcgdv.com",
  locale: "en",
  roles: [UserRoles.ADMIN],
  username: "max.mustermann@bcgdv.com"
};

export const userMock: IUser = {
  email: "max.mustermann@bcgdv.com",
  locale: "en",
  roles: [],
  username: "max.mustermann@bcgdv.com"
};

export const authMock: IAuthState = {
  isLoggedIn: true,
  isSessionBootstrapped: true,
  newPasswordRequired: false,
  user: adminUserMock
};

export const cognitoSessionMock: any = {
  accessToken: { jwtToken: "ThisIsAFooToken" },
  isValid: () => true
};

export const paginationMock: IPageable = {
  page: 0
};

export const usersStateMock: IUsersState = {
  isLoading: false,
  users: usersMock
};

export const stateMock: IApplicationState = {
  auth: authMock,
  users: usersStateMock,
  i18n: { language: "en" },
  loadingBar: {},
  router: routeComponentMock,
  toasts: {}
};
