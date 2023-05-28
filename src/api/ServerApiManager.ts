import API_METHODS from "constants/ApiMethods";
import BaseApiManager from "./BaseApiManager";
import { serverProps, serverSettings } from "utils/types";

const ServerApiManager = (function () {
  function addParamsToURL(url: string, payload: any) {
    let newURL = url;
    for (let key in payload) {
      newURL += `/${key}=${payload[key]}`;
    }
    return newURL;
  }

  function generateRequest(
    payload: any,
    settings: serverSettings | undefined,
    methodName: string
  ) {
    const url = BaseApiManager.buildeUrl(methodName);
    const fullUrl = addParamsToURL(url, payload);
    const defaultHeaders = BaseApiManager.getHeaders();

    const data = {
      url: fullUrl,
      headers: defaultHeaders,
      nextSettings: settings?.next ?? {},
      cache: settings?.cache || "default",
    };

    return data;
  }
  function execute(props: serverProps, methodName: string) {
    const settings = generateRequest(props.payload, props.settings, methodName);

    return fetch(settings.url, {
      method: API_METHODS.GET,
      headers: settings.headers,
      next: settings.nextSettings,
      cache: settings.cache,
    });
  }
  return { execute };
})();

export default ServerApiManager;
