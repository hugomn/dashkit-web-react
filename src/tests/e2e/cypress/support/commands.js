import * as AWSCognito from "amazon-cognito-identity-js";

Cypress.Commands.add("login", (email, password) => {
  const poolData = {
    ClientId: Cypress.env("REACT_APP_COGNITO_CLIENT_ID"),
    UserPoolId: Cypress.env("REACT_APP_COGNITO_USER_POOL_ID")
  };

  const userPool = new AWSCognito.CognitoUserPool(poolData);
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
        reject({
          newPasswordRequired: true,
          requiredAttributes,
          userAttributes
        });
      },
      onFailure: err => reject(err),
      onSuccess: session => {
        resolve(session);
      }
    });
  });
});
