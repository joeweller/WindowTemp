import WebRequest from "../classes/WebRequest";

export default class {
  #oauth2ClientId: string;
  #clientSecret: string;
  #refreshToken: string;
  #projectId: string;
  #authToken: string;

  constructor(config: Config) {
    this.#oauth2ClientId = config.oauth2ClientId;
    this.#clientSecret = config.clientSecret;
    this.#projectId = config.projectId;
    this.#refreshToken = config.refreshToken;
    this.#authToken = config.authToken;
  }

  authorizeInit(projectId: string, oauth2ClientId: string): Promise<any> {
    const url = `https://nestservices.google.com/partnerconnections/${projectId}/auth?redirect_uri=https://www.google.com&access_type=offline&prompt=consent&client_id=${oauth2ClientId}&response_type=code&scope=https://www.googleapis.com/auth/sdm.service`;
    const req: WebRequest = new WebRequest().get().setStringAsUrl(url);
    return req.send();
  }

  async #refreshAccessToken() {
    const url = `https://www.googleapis.com/oauth2/v4/token?client_id=${
      this.#oauth2ClientId
    }&client_secret=${this.#clientSecret}&refresh_token=${
      this.#refreshToken
    }&grant_type=refresh_token`;

    const req: WebRequest = new WebRequest().post().setStringAsUrl(url);

    const res: WebResponse = await req.send();
    if (res.statusCode / 100 !== 2) {
      throw new Error("Unable to retreive access token");
    }
    this.#authToken = res.getJson<RefreshResponse>().access_token;
  }

  async #makeRequest(request: WebRequest) {
    let result: WebResponse = await request.send();
    if (result.statusCode / 100 === 3) {
      await this.#refreshAccessToken();
      request.setAuthorizationToken(this.#authToken);
      result = await request.send();
    }
    return result;
  }

  async getDeviceList() {
    const url = `'https://smartdevicemanagement.googleapis.com/v1/enterprises/${
      this.#projectId
    }/devices'`;
    const req: WebRequest = new WebRequest();
    req
      .get()
      .setStringAsUrl(url)
      .setAuthorizationToken(this.#authToken)
      .setContentType("application/json");
    const res: WebResponse = await this.#makeRequest(req);
  }

  async getDevice(deviceId: string): Promise<DeviceResponse> {
    const req: WebRequest = new WebRequest();
    req
      .setStringAsUrl(
        `https://smartdevicemanagement.googleapis.com/v1/enterprises/${
          this.#projectId
        }/devices/${deviceId}`
      )
      .get()
      .setAuthorizationToken(this.#authToken)
      .setContentType("application/json");
    const res: WebResponse = await this.#makeRequest(req);
    return res.getJson<DeviceResponse>();
  }
}

export interface Config {
  oauth2ClientId: string;
  clientSecret: string;
  projectId: string;
  refreshToken: string;
  authToken: string;
}
