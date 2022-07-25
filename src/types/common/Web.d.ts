interface WebResponse {
  statusCode: number;
  status: string;
  headers: NodeJS.Dict<string | string[]>;
  body: Buffer;
  getBodyAsString(): string;
  getJson<T>(): T;
}
