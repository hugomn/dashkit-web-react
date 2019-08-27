import {
  mockNewPassword,
  mockPin,
  userMockPasswordRequired,
  userMockResetPassword,
  userPasswordMock
} from "../tests/mocks/user";
import cognito, {
  forgotPasswordCallback,
  sessionCallback,
  userAttributesCallback
} from "./cognito";

describe("Cognito service", () => {
  describe("authenticateUser method", () => {
    it("should return a resolved Promise when username and password matches", async () => {
      const data = await cognito.authenticateUser(
        userPasswordMock.email,
        userPasswordMock.password
      );
      expect(data).toBe(userPasswordMock);
    });

    it("should return a rejected Promise when user has not changed his password yet", async () => {
      try {
        await cognito.authenticateUser(
          userMockPasswordRequired.username,
          userMockPasswordRequired.password
        );
      } catch (error) {
        expect(error.newPasswordRequired).toBe(true);
      }
    });

    it("should return a rejected Promise with an error message when login details doesn't match", async () => {
      await expect(
        cognito.authenticateUser(
          Math.random()
            .toString(36)
            .substring(7),
          userPasswordMock.password
        )
      ).rejects.toThrowError();
    });
  });

  describe("completeNewPasswordChallenge method", () => {
    it("should return a resolved Promise password changed successfully", async () => {
      const data = await cognito.completeNewPasswordChallenge(mockNewPassword.success);
      expect(data).toBe(userPasswordMock);
    });

    it("should return a rejected Promise change fail", async () => {
      await expect(
        cognito.completeNewPasswordChallenge(mockNewPassword.failure)
      ).rejects.toThrowError();
    });
  });

  describe("forgot password method", () => {
    it("should run forgot password", async () => {
      await expect(cognito.forgotPassword("email")).resolves.toBe(true);
    });
  });

  describe("forgot password callback method", () => {
    it("should resolve to success", async () => {
      const res = await new Promise((resolve, reject) => {
        forgotPasswordCallback(resolve, reject).onSuccess("success");
      });
      expect(res).toBe(true);
    });

    it("should reject when failure", async () => {
      await expect(
        new Promise((resolve, reject) => {
          forgotPasswordCallback(resolve, reject).onFailure("error");
        })
      ).rejects.toBe("error");
    });
  });

  describe("change password method with verification code", () => {
    it("should return a resolved promise change password", async () => {
      const { username, password } = userMockResetPassword;
      const result = await cognito.changePassword(username, password, mockPin.success);
      expect(result).toBe(true);
    });

    it("should return a rejected promise for change password fail", async () => {
      const { username, password } = userMockResetPassword;
      await expect(
        cognito.changePassword(username, password, mockPin.failure)
      ).rejects.toThrowError();
    });
  });

  describe("logout method", () => {
    it("should log user out", async () => {
      await expect(cognito.logout()).resolves.toBe(true);
    });
  });

  describe("getSession method", () => {
    it("should return user session", async () => {
      const data: any = await cognito.getSession();
      expect(data.isValid()).toBeTruthy();
    });
  });

  describe("sessionCallback method", () => {
    it("should resolve to success", async () => {
      const res = await new Promise((resolve, reject) => {
        resolve(sessionCallback(resolve, reject)(null, "success"));
      });
      expect(res).toBe("success");
    });

    it("should reject when failure", async () => {
      await expect(
        new Promise((resolve, reject) => {
          sessionCallback(resolve, reject)("error", null);
        })
      ).rejects.toBe("error");
    });
  });

  describe("getUserAttributes method", () => {
    it("should return correct attributes", async () => {
      const data: any = await cognito.getUserAttributes();
      expect(data.key).toBe("value");
    });
  });

  describe("userAttributesCallback method", () => {
    it("should resolve to success", async () => {
      const data: any = await new Promise((resolve, reject) => {
        resolve(
          userAttributesCallback(resolve, reject)(null, [
            { getName: () => "key", getValue: () => "value" }
          ])
        );
      });
      expect(data.key).toBe("value");
    });

    it("should reject when failure", async () => {
      await expect(
        new Promise((resolve, reject) => {
          userAttributesCallback(resolve, reject)("error", null);
        })
      ).rejects.toBe("error");
    });
  });
});
