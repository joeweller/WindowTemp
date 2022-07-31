import PushoverMessage from "../classes/PushoverMessage";
import { Request } from "../classes/Web";
export default class {
  #appToken: string;
  #targetKey: string;

  constructor(config: Config) {
    this.#appToken = config.appToken;
    this.#targetKey = config.targetKey;
  }

  async sendMessage(message: PushoverMessage) {
    message.setToken(this.#appToken);
    message.setUserOrGroup(this.#targetKey);

    const messageString = JSON.stringify(message);
    console.log(messageString);

    const req: Request = new Request();
    req
      .post()
      .setContentType("application/json")
      .setStringAsUrl("https://api.pushover.net/1/messages.json")
      .setBodyAsString(messageString);
    const res: WebResponse = await req.send();
    console.log(res);
    console.log(res.getBodyAsString());
  }
}

export interface Config {
  appToken: string; // application token
  targetKey: string; // The user or group key
}
