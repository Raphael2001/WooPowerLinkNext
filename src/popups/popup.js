"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

import POPUP_TYPES from "constants/popup-types";
import { generateUniqueId } from "utils/functions";

// popup components
import ApiErrorPopup from "./components/ApiErrorPopup/ApiErrorPopup";
import TextsPopup from "./components/TextsPopup/TextsPopup";
import BasicPopup from "./components/Basic/BasicPopup";
import TwoActionPopup from "./components/TwoAction";

export default function Popups() {
  const popupsArray = useSelector((store) => store.popupsArray);

  // stop body from scrolling while popup is open
  useEffect(() => {
    const userAgent = navigator.userAgent;

    if (popupsArray.length > 0) {
      const popupContainer = document.querySelector("#popupContainer");
      if (!userAgent.match(/safari/i)) {
        console.log("unmatched in");
        disableBodyScroll(popupContainer);
      } else {
        document.body.style.overflow = "hidden";
        document.body.style.WebkitOverflowScrolling = "none";
      }
    }
    return () => {
      if (!userAgent.match(/safari/i)) {
        console.log("unmatched out");
        clearAllBodyScrollLocks();
      } else {
        document.body.style.overflow = null;
        document.body.style.WebkitOverflowScrolling = null;
      }
    };
  }, [popupsArray]);

  // map popup types to popup components
  const getPopupComponent = (key, type, payload) => {
    const popupComponents = {
      [POPUP_TYPES.API_ERROR]: <ApiErrorPopup key={key} payload={payload} />,
      [POPUP_TYPES.BASIC]: <BasicPopup key={key} payload={payload} />,
      [POPUP_TYPES.TWO_ACTION]: <TwoActionPopup key={key} payload={payload} />,
      [POPUP_TYPES.TEXTS]: <TextsPopup key={key} payload={payload} />,
    };

    const popupToReturn =
      type in popupComponents ? (
        popupComponents[type]
      ) : (
        <ApiErrorPopup key={key} payload={{ text: "unknown popup type" }} />
      );
    return popupToReturn;
  };

  const renderPopups = () => {
    const popupsToRender = popupsArray.map((popup) => {
      const key = generateUniqueId();
      return getPopupComponent(key, popup.type, popup.payload);
    });
    return popupsToRender;
  };

  return (
    <div className="popup" id="popupContainer">
      {renderPopups()}
    </div>
  );
}
