import resources from "./resources";

describe("Resource", () => {
  it("should have at least one language", () => {
    expect(Object.keys(resources).length).toBeGreaterThan(0);
  });
});
