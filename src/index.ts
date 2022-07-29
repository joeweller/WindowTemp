import { join } from "path";
import { parseJsonFile } from "./classes/helpers";
import PushoverMessage from "./classes/PushoverMessage";
import WebRequest from "./classes/WebRequest";
import PushoverService from "./services/PushoverService";

const configLocation = join(__dirname, "../config/app.json");

async function main() {
  // console.log(config);
  //   let response: WebResponse = await new WebRequest()
  //     .post()
  //     .setHeader("SOMETHING", "SOMETHING ELSE")
  //     .setStringAsUrl("https://putsreq.com/Y69qvyu2beLV7jeTxqg0")
  //     .setBodyAsString("{Something: seomthing else}")
  //     .send();
  //   console.log(response);
  //   console.log(response.bodyAsString());

  const config = await parseJsonFile(configLocation);
  console.log(config);
  const message: PushoverMessage = new PushoverMessage();
  message.setMessage("hello world 2");

  const messageService: PushoverService = new PushoverService({
    appToken: config.pushover.appToken,
    targetKey: config.pushover.targetKey,
  });
  await messageService.sendMessage(message);
}
main();
