import { IUser } from "../../store/users/types";

export const userMockPasswordRequired = {
  username: "john.doe@bcgdv.com",
  password: "Test1234",
  newPasswordRequired: true
};

export const mockNewPassword = {
  success: "GoodPassword",
  failure: "Badpassword"
};

export const userMockResetPassword = {
  username: "max.mustermann@bcgdv.com",
  password: "Test1234",
  pin: "123456"
};

export const userPasswordMock = {
  email: "max.mustermann@bcgdv.com",
  password: "Test1234"
};

export const usersMock: IUser[] = [
  {
    email: "john.doe@bcgdv.com",
    locale: "en"
  },
  {
    email: "max.mustermann@bcgdv.com",
    locale: "en"
  }
];

export const mockPin = {
  success: "VerifiedPin",
  failure: "NonVerifiedPin"
};
