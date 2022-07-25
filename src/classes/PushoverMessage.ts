export default class {
  token: string | undefined;
  user: string | undefined;
  message: string | undefined;
  device: string | undefined;
  html: 1 | undefined;
  priority: -2 | -1 | 0 | 1 | 2 | undefined;
  timestamp: number | undefined;
  title: string | undefined;
  url: string | undefined;
  url_title: string | undefined;
  sound: string | undefined;

  setMessage(message: string) {
    this.message = message;
    return this;
  }

  setDevice(deviceName: string) {
    this.device = deviceName;
    return this;
  }

  isHtml() {
    this.html = 1;
    return this;
  }

  setPriority(priority: -2 | -1 | 0 | 1 | 2) {
    this.priority = priority;
    return this;
  }
  setSound(sound: SoundEnum) {
    this.sound = sound;
    return this;
  }

  setTimestamp(unixTime: number) {
    this.timestamp = unixTime;
    return this;
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setUrl(url: string, title: string | null) {
    if (title) this.url_title = title;
    this.url = url;
  }

  setToken(token: string) {
    this.token = token;
    return this;
  }

  setUserOrGroup(key: string) {
    this.user = key;
    return this;
  }
}

export enum SoundEnum {
  pushover = "Pushover",
  bike = "Bike",
  bugle = "Bugle",
  cashregister = "Cash",
  classical = "Classical",
  cosmic = "Cosmic",
  falling = "Falling",
  gamelan = "Gamelan",
  incoming = "Incoming",
  intermission = "Intermission",
  magic = "Magic",
  mechanical = "Mechanical",
  pianobar = "Piano",
  siren = "Siren",
  spacealarm = "Space",
  tugboat = "Tug",
  alien = "Alien",
  climb = "Climb",
  persistent = "Persistent",
  echo = "Pushover",
  updown = "Up",
  vibrate = "Vibrate",
  none = "None",
}
