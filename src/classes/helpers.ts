import { readFileSync } from "fs";

export async function parseJsonFile(filePath: string): Promise<any> {
  const data: Buffer = await readFileSync(filePath);
  return JSON.parse(data.toString());
}
