"use client";
import React from "react";

import LottieAnimation from "components/LottieAnimation/LottieAnimation";

import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";

import ErrorAnimation from "animations/error.json";
import styles from "./ApiErrorPopup.module.scss";
function ApiErrorPopup(props) {
  const { payload } = props;

  const { title = "שגיאת שרת", text = "מצטערים, יש שגיאה בשרת" } = payload;

  return (
    <SlidePopup className={styles["api-error-popup"]} extraStyles={styles}>
      <div className={styles["api-error-wrapper"]}>
        <div className={styles["error-animation-wrapper"]}>
          <LottieAnimation animation={ErrorAnimation} autoplay loop />
        </div>

        <div className={styles["texts-wrapper"]}>
          <h4 className={styles["title"]}>{title}</h4>
          <span className={styles["text"]}>{text}</span>
        </div>
      </div>
    </SlidePopup>
  );
}

export default ApiErrorPopup;
