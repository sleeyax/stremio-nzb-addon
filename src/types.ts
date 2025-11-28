interface AddonConfig {
  nntpServers: Array<{ server: string }>;
}

export interface NzbHydraAddonConfig extends AddonConfig {
  indexerUrl: string;
  indexerApiKey: string;
}

export interface NzbAddonConfig extends AddonConfig {
  indexers: Array<{ url: string; apiKey: string }>;
}

export interface RSS extends Channel {
  channel: Channel;
}

export interface Channel {
  title: string;
  link: string;
  webMaster: string;
  category: Category;
  response: Response;
  item: Item[];
  generator: string;
}

export interface Category {}

export interface Response {
  "@attributes": Attributes;
}

export interface Attributes {
  offset: string;
  total: string;
}

export interface Item {
  title: string;
  guid: string;
  link: string;
  comments: string;
  pubDate: number;
  category: string;
  description: string;
  enclosure: Enclosure;
  attr: Attr[];
  id: string;
}

export interface Enclosure {
  "@attributes": Attributes2;
}

export interface Attributes2 {
  url: string;
  length: string;
  type: string;
}

export interface Attr {
  "@attributes": Attributes3;
}

export interface Attributes3 {
  name: string;
  value: string;
}

export interface Config {
  fields: ConfigField[];
}

export interface ConfigField {
  key: string;
  type: "text" | "password" | "array";
  default?: string;
  title?: string;
  options?: string[];
  required?: boolean;
  placeholder?: string;
  arrayOptions?: Omit<ConfigField, "arrayOptions">[];
}
