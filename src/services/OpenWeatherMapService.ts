import { Request } from "../classes/Web";

export default class {
  #key: string;
  #lon: number;
  #lat: number;
  constructor(config: Config) {
    this.#key = config.key;
    this.#lon = config.lon;
    this.#lat = config.lat;
  }

  async getWeather() {
    const url: string = `https://api.openweathermap.org/data/2.5/weather?lat=${
      this.#lat
    }&lon=${this.#lon}&appid=${this.#key}`;
    const req: Request = new Request();
    req.get().setStringAsUrl(url);
    return req.send();
  }
}

export interface Config {
  key: string;
  lon: number;
  lat: number;
}
