export enum UsersActionTypes {
  USERS_FETCH_ALL_FAILED = "@@users/USERS_FETCH_ALL_FAILED",
  USERS_FETCH_ALL_REQUESTED = "@@users/USERS_FETCH_ALL_REQUESTED",
  USERS_FETCH_ALL_SUCCEEDED = "@@users/USERS_FETCH_ALL_SUCCEEDED"
}

export interface IUsersState {
  readonly isLoading: boolean;
  readonly users?: IUser[];
}

export interface IPageable {
  page?: number;
  first?: boolean;
  last?: boolean;
  totalPages?: number;
}

export interface ISortParams {
  ascending: boolean;
  property: string;
  sortProperty?: string;
}

export enum UserRoles {
  ADMIN = "ADMIN"
}

export interface IUser {
  readonly id?: string;
  readonly username?: string;
  readonly email: string;
  readonly locale?: string;
  readonly roles?: UserRoles[];
  readonly created?: string;
  readonly updated?: string;
}
