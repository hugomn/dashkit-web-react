import { passwordValidations } from "./validations";

describe("Test password validation expresssions", () => {
  it("password validations return as expected", () => {
    const mockValid = [true, true, true, true];
    const validations = passwordValidations.map(validation => {
      return validation.isValid("Test1234");
    });
    expect(validations).toEqual(mockValid);
  });

  it("returns false on invalid password", () => {
    const mockValid = [false, false, false, false];
    const validations = passwordValidations.map(validation => {
      return validation.isValid(" ");
    });
    expect(validations).toEqual(mockValid);
  });
});
