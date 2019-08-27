import marked from "marked";
import { convertMarkdown } from "./markdownProcessor";

jest.mock("marked");

describe("Test convert markdown", () => {
  it("Should call marked on value", () => {
    convertMarkdown("test");
    expect(marked).toBeCalledWith("test");
  });
});
