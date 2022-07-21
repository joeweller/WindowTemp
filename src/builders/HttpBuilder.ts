import * as https from "https";
import { URL } from "url";

export default class {
  #method: string;
  #body: Buffer | null;
  #headers: Record<string, string>;
  #url: URL | string;

  constructor() {
    this.#method = "GET";
    this.#body = null;
    this.#headers = {};
    this.#url = "";
  }

  /** Http Methods */
  get(): this {
    this.#method = "GET";
    return this;
  }

  post(): this {
    this.#method = "POST";
    return this;
  }

  /** Set body */
  setBodyAsString(body: string): this {
    this.#body = Buffer.from(body);
    return this;
  }

  setBody(body: Buffer): this {
    this.#body = body;
    return this;
  }

  /** set header */
  setHeaders(headers: Record<string, string>): this {
    this.#headers = headers;
    return this;
  }

  setHeader(key: string, value: string): this {
    this.#headers[key] = value;
    return this;
  }

  setAuthorizationToken(token: string): this {
    this.setHeader("Authorization", `Bearer: ${token}`);
    return this;
  }

  setUrl(url: URL): this {
    this.#url = url;
    return this;
  }

  setStringAsUrl(url: string): this {
    this.#url = url;
    return this;
  }

  /** send request */
  async send(): Promise<HttpsResponse> {
    return new Promise((resolve, reject): HttpsResponse | any => {
      if (!this.#url) reject("url must be provided");

      const req = https.request(
        this.#url,
        {
          headers: this.#headers,
          method: this.#method,
        },
        (res) => {
          const chunks: Uint8Array[] = [];
          res.on("data", (chunk: Uint8Array) => {
            chunks.push(chunk);
          });
          res.on("error", (err) => {
            reject(err);
          });
          res.on("end", () => {
            resolve(
              new Response(
                res.statusCode,
                res.statusMessage,
                res.headers,
                Buffer.concat(chunks)
              )
            );
          });
        }
      );
      req.write(this.#body);
      req.end();
    });
  }
}

class Response implements HttpsResponse {
  statusCode: number | undefined;
  status: string | undefined;
  headers: NodeJS.Dict<string | string[]> | undefined;
  body: Buffer;

  constructor(
    statusCode: number | undefined,
    status: string | undefined,
    headers: NodeJS.Dict<string | string[]> | undefined,
    body: Buffer
  ) {
    this.statusCode = statusCode;
    this.status = status;
    this.headers = headers;
    this.body = body;
  }

  bodyAsString(): string {
    return this.body.toString();
  }
}
