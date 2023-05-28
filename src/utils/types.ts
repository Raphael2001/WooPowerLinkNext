import exp from "constants";

export type serverSettings = {
  next?: NextFetchRequestConfig;
  cache?: RequestCache;
};
export type serverProps = {
  settings?: serverSettings | undefined;
  payload?: any;
};

export type popup = {
  type: string;
  payload: any;
};

export type notificationPayload = {
  id: string;
  title?: string;
  text?: string;
  timer?: number;
};

export type notification = {
  type: string;
  payload: notificationPayload;
};

export type init = {
  texts: any;
  media: any;
  language: language;
};
export type language = {
  id: string;
  lang: string;
};

export type generalInfo = {
  _id: string;
  value: any;
};

export enum MediaTypes {
  INTERNAL = "internal",
  EXTERNAL = "external",
}

export enum MimeTypes {
  VIDEO = "video",
  IMAGE = "image",
}

export type Mime = string | MimeTypes.IMAGE | MimeTypes.VIDEO;
export type MediaType = string | MediaTypes.INTERNAL | MediaTypes.EXTERNAL;

export type Src = {
  type: MediaType;
  url: string;
  name: string;
  mime: Mime;
};
export type Media = {
  name: string;
  _id: string;
  src: Src;
  alt: string;
};

export type clientSettings = {
  method: string;
  url: string;
  headers: any;
  withCredentials: true;
  data?: any;
  params?: any;
};

export type item = {
  powerLinkIds: String[];
  quantity: number;
  wooId: string;
};

export type onSuccessFunction = (a: any) => void;
export type onFailureFunction = (a: any) => void;
export type onRejectFunction = (a: any) => void;
