import GoogleNestService from "./services/GoogleNestService";

async function main() {
  //   console.log("Start: Authorize google nest\n");
  //   const nestService = new GoogleNestService();
  //   const nestResponse: WebResponse = await nestService.authorizeInit(
  //     "5269f34f-4818-4117-8569-e8ba4ca6cc7d",
  //     "151795302868-bdk77gl2duj2qt388kg126bqv9f591qk.apps.googleusercontent.com"
  //   );
  //   if (nestResponse && nestResponse.statusCode === 302) {
  //     console.log(`Authorization Url: ${nestResponse.headers?.location}`);
  //     console.log(
  //       [
  //         "\n\nIMPORTANT!\n",
  //         "After clicking on the link, you should be redirected to https://www.google.com.",
  //         "The Authorization Code is returned as the code parameter in the URL, which should be in this format:",
  //         "https://www.google.com?code=AUTHORIZATION-CODE&scope=https://www.googleapis.com/auth/sdm.service",
  //         'You will need to copy the copy the "AUTHORIZATION-CODE".',
  //       ].join("\n")
  //     );
  //   } else {
  //     console.log("Something went wrong during nest authorization");
  //   }
}

main();
