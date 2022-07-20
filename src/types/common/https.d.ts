interface HttpsResponse {
  statusCode: number | undefined;
  status: string | undefined;
  headers: NodeJS.Dict<string | string[]> | undefined;
  body: Buffer;
  bodyAsString(): string;
}
