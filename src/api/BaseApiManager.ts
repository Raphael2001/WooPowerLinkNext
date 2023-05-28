import Actions from "redux/actions";
import store from "../redux/index";
import POPUP_TYPES from "constants/popup-types";

const BaseApiManager = (function () {
  const api = {
    baseUrl: process.env.NEXT_PUBLIC_HOST,
    version: process.env.NEXT_PUBLIC_API_VERSION,
    api: process.env.NEXT_PUBLIC_API,
  };

  function buildeUrl(methodName: string) {
    return api.baseUrl + "/" + api.api + "/" + api.version + "/" + methodName;
  }

  function getHeaders() {
    return { "Content-Type": "application/json; charset=UTF-8" };
  }

  function onReject(response: string) {
    store.dispatch(
      Actions.addPopup({
        type: POPUP_TYPES.API_ERROR,
        payload: { text: response },
      })
    );
  }

  function onFailure(response: string) {
    store.dispatch(
      Actions.addPopup({
        type: POPUP_TYPES.API_ERROR,
        payload: { text: response },
      })
    );
  }

  function onSuccess() {}
  return {
    buildeUrl,
    getHeaders,
    onReject,
    onFailure,
    onSuccess,
  };
})();

export default BaseApiManager;
