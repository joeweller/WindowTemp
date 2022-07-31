import { Request, Response } from "../classes/Web";

export class GoogleNestService {
  #config: NestConfig;

  constructor(config: NestConfig) {
    this.#config = config;
  }

  authorizeInit(projectId: string, oauth2ClientId: string): Promise<any> {
    const url = `https://nestservices.google.com/partnerconnections/${projectId}/auth?redirect_uri=https://www.google.com&access_type=offline&prompt=consent&client_id=${oauth2ClientId}&response_type=code&scope=https://www.googleapis.com/auth/sdm.service`;
    const req: Request = new Request().get().setStringAsUrl(url);
    return req.send();
  }

  async #refreshAccessToken() {
    const url = `https://www.googleapis.com/oauth2/v4/token?client_id=${
      this.#config.oauth2ClientId
    }&client_secret=${this.#config.clientSecret}&refresh_token=${
      this.#config.refreshToken
    }&grant_type=refresh_token`;

    const req: Request = new Request().post().setStringAsUrl(url);

    const res: Response = await req.send();
    if (res.statusCode / 100 !== 2) {
      throw new Error("Unable to retreive access token");
    }
    this.#config.authToken = res.getJson<RefreshResponse>().access_token;
  }

  async #makeRequest(request: Request) {
    let result: Response = await request.send();
    if (result.statusCode / 100 === 3) {
      await this.#refreshAccessToken();
      request.setAuthorizationToken(this.#config.authToken);
      result = await request.send();
    }
    return result;
  }

  async getDeviceList() {
    const url = `'https://smartdevicemanagement.googleapis.com/v1/enterprises/${
      this.#config.projectId
    }/devices'`;
    const req: Request = new Request();
    req
      .get()
      .setStringAsUrl(url)
      .setAuthorizationToken(this.#config.authToken)
      .setContentType("application/json");
    const res: Response = await this.#makeRequest(req);
  }

  async getDevice(deviceId: string): Promise<DeviceResponse> {
    const req: Request = new Request();
    req
      .setStringAsUrl(
        `https://smartdevicemanagement.googleapis.com/v1/enterprises/${
          this.#config.projectId
        }/devices/${deviceId}`
      )
      .get()
      .setAuthorizationToken(this.#config.authToken)
      .setContentType("application/json");
    const res: Response = await this.#makeRequest(req);
    return res.getJson<DeviceResponse>();
  }
}

export class NestConfig {
  oauth2ClientId: string;
  clientSecret: string;
  projectId: string;
  refreshToken: string;
  authToken: string;

  constructor() {
    this.oauth2ClientId = "";
    this.clientSecret = "";
    this.projectId = "";
    this.refreshToken = "";
    this.authToken = "";
  }
}
