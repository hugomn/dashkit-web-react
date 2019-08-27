import { capitalizeString } from "./string";

describe("Utils methods", () => {
  it("should return a capitalised string", () => {
    const str = capitalizeString("STRING");
    expect(str).toEqual("String");
  });
});
