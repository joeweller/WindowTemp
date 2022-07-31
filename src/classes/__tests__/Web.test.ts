import { Request, Response } from "../Web";

describe("WebRequest", () => {
  it("constructs", () => {
    const i = new Request();
    expect(i).not.toBeNull();
  });
});
