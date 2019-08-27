import {
  mockPin,
  mockNewPassword,
  userMockPasswordRequired,
  userPasswordMock
} from "../src/tests/mocks/user";

function AuthenticationDetails(data) {
  const { Username, Password } = data;
  this.username = Username;
  this.password = Password;
  this.getUsername = jest.fn().mockReturnValue("cognitousername");
  this.getPassword = jest.fn().mockReturnValue("cognitouserpassword");
}

function CognitoUser(data) {
  const { Username, Pool } = data;
  this.username = Username;
  this.pool = Pool;

  this.shouldFailLogout = false;
  this.shouldFailForgotPassword = false;

  this.setShouldFailLogout = fail => {
    this.shouldFailLogout = fail;
  };

  this.setShouldFailForgotPassword = fail => {
    this.shouldFailForgotPassword = fail;
  };

  this.authenticateUser = (authenticationDetails, callbacks) => {
    switch (authenticationDetails.username) {
      case userPasswordMock.email:
        callbacks.onSuccess(userPasswordMock);
        break;
      case userMockPasswordRequired.username:
        callbacks.newPasswordRequired({}, {});
        break;
      default:
        callbacks.onFailure(new Error("Failed"));
        break;
    }
  };

  this.completeNewPasswordChallenge = (newPassword, userAttributes, callbacks) => {
    switch (newPassword) {
      case mockNewPassword.success:
        callbacks.onSuccess(userPasswordMock);
        break;
      default:
        callbacks.onFailure(new Error("Failed"));
        break;
    }
  };

  this.forgotPassword = callbacks => {
    this.shouldFailForgotPassword ? callbacks.onFailure(true) : callbacks.onSuccess(true);
  };

  this.confirmPassword = (pin, password, callbacks) => {
    switch (pin) {
      case mockPin.success:
        callbacks.onSuccess(true);
        break;
      default:
        callbacks.onFailure(new Error("Failed"));
        break;
    }
  };

  this.globalSignOut = callbacks => {
    this.shouldFailLogout ? callbacks.onFailure(true) : callbacks.onSuccess(true);
  };

  this.signOut = jest.fn();

  this.getSession = callback => {
    callback(null, { accessToken: { jwtToken: "fakeToken" }, isValid: () => true });
  };

  this.getUserAttributes = callback =>
    callback(null, [{ getName: () => "key", getValue: () => "value" }]);
}

function CognitoUserPool(data) {
  const { UserPoolId, ClientId } = data;
  this.userPoolId = UserPoolId;
  this.clientId = ClientId;
  this.getCurrentUser = () => new CognitoUser({ Username: "foo", Pool: "test" });
  this.signOut = jest.fn();
}

module.exports = { AuthenticationDetails, CognitoUser, CognitoUserPool };
