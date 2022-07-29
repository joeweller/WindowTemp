import WebRequest from "../WebRequest";

describe("WebRequest", () => {
  it("constructs", () => {
    const i = new WebRequest();
    expect(i).not.toBeNull();
  });
});
