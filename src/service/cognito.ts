import * as AWSCognito from "amazon-cognito-identity-js";

const poolData: AWSCognito.ICognitoUserPoolData = {
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID as string | "",
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID as string | ""
};
const userPool = new AWSCognito.CognitoUserPool(poolData);

let currentUser: AWSCognito.CognitoUser;

/**
 * Set current user session locally
 * @param user
 */
export const setCurrentUserSession = (user: AWSCognito.CognitoUser) => {
  currentUser = user;
};

/**
 * Returns the current user session
 */
export const getCurrentUserSession = () => currentUser;

export const sessionCallback: any = (resolve: any, reject: any) => (err: any, session: any) => {
  if (err) {
    reject(err);
  } else {
    resolve(session);
  }
};

/**
 * Get logged user session
 */
const getSession = () => {
  const cognitoUser = userPool.getCurrentUser();
  /* istanbul ignore next line */
  if (cognitoUser != null) {
    return new Promise((resolve, reject) => {
      cognitoUser.getSession(sessionCallback(resolve, reject));
    });
  }
  /* istanbul ignore next line */
  return Promise.reject();
};

export const userAttributesCallback: any = (resolve: any, reject: any) => (
  err: any,
  attrs?: any
) => {
  if (err) {
    reject(err);
  } else {
    const payload: any =
      attrs &&
      attrs.reduce(
        (prev: AWSCognito.CognitoUserAttribute, next: AWSCognito.CognitoUserAttribute): any => {
          return { ...prev, [next.getName()]: next.getValue() };
        },
        {} as any
      );
    resolve(payload);
  }
};

/**
 * Get user attributes
 */
const getUserAttributes = () => {
  const cognitoUser = userPool.getCurrentUser();
  /* istanbul ignore next line */
  if (cognitoUser) {
    return new Promise((resolve, reject) => {
      cognitoUser.getUserAttributes(userAttributesCallback(resolve, reject));
    });
  }
};

/**
 * Authenticate user to Cognito
 * @param email User e-mail
 * @param password User password
 */
const authenticateUser = (email: string, password: string) => {
  const authenticationDetails = new AWSCognito.AuthenticationDetails({
    Password: password,
    Username: email
  });
  const cognitoUser = new AWSCognito.CognitoUser({
    Pool: userPool,
    Username: email
  });
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        setCurrentUserSession(cognitoUser);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          newPasswordRequired: true,
          requiredAttributes,
          userAttributes
        });
      },
      onFailure: err => reject(err),
      onSuccess: (session: AWSCognito.CognitoUserSession) => {
        resolve(session);
      }
    });
  });
};

/**
 * Forgot password flow
 * @param email Username
 */
export const forgotPassword = (email: string) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new AWSCognito.CognitoUser({
      Pool: userPool,
      Username: email
    });
    // cognitoUser.forgotPassword({
    //   onFailure: err => reject(err),
    //   onSuccess: () => resolve(true)
    // });
    cognitoUser.forgotPassword(forgotPasswordCallback(resolve, reject));
  });
};

export const forgotPasswordCallback = (resolve: any, reject: any) => ({
  onFailure: (err: any) => reject(err),
  onSuccess: () => resolve(true)
});

/**
 * Save a new password for an unauthenticated user
 * The user receives a verification code inside the password reset e-mail
 * @param verificationCode
 * @param password
 * @param email
 */
const changePassword = (email: string, newPassword: string, verificationCode: string) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new AWSCognito.CognitoUser({
      Pool: userPool,
      Username: email
    });
    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onFailure: err => reject(err),
      onSuccess: () => resolve(true)
    });
  });
};

/**
 * Complete the new password challenge providing the new password
 * @param newPassword New password
 */
const completeNewPasswordChallenge = (newPassword: string) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getCurrentUserSession();
    cognitoUser.completeNewPasswordChallenge(
      newPassword,
      {},
      {
        onFailure: err => reject(err),
        onSuccess: (session: AWSCognito.CognitoUserSession) => resolve(session)
      }
    );
  });
};

/**
 * Logout current user
 */
const logout = () => {
  return new Promise(resolve => {
    const cognitoUser = userPool.getCurrentUser();
    /* istanbul ignore next line */
    if (cognitoUser) {
      cognitoUser.signOut();
    }
    resolve(true);
  });
};

export default {
  authenticateUser,
  changePassword,
  completeNewPasswordChallenge,
  forgotPassword,
  getSession,
  getUserAttributes,
  logout,
  userAttributesCallback,
  userPool
};
