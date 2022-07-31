import PushoverMessage from "../../classes/PushoverMessage";
import { Request, Response } from "../../classes/Web";
import PushoverService from "../PushoverService";
import { Config } from "../PushoverService";
import * as https from "https";

describe("PushoverService", () => {
  it("constructs", async () => {
    // const httpsMock = jest.spyOn(https, "request").mockResolvedValueOnce({});
    // const webRequestStub = jest.doMock(WebRequest)
    const mockResponse: Response = new Response(
      200,
      "OK",
      {},
      Buffer.from("Some Body")
    );

    const webRequestSpy = jest
      .spyOn(Request.prototype, "send")
      .mockResolvedValueOnce(mockResponse);

    const config: Config = { appToken: "token", targetKey: "targetKey" };
    const service: PushoverService = new PushoverService(config);

    const message: PushoverMessage = new PushoverMessage();
    message.setMessage("message");
    message.setUrl("url", "urlTitle");
    await service.sendMessage(message);

    expect(webRequestSpy).toBeCalledTimes(1);
    // expect(webRequestSpy).not.toBeNull();
  });
});
