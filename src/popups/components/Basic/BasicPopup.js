import LottieAnimation from "components/LottieAnimation/LottieAnimation";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import React from "react";

import styles from "./BasicPopup.module.scss";

import LottieAnimationNames from "constants/LottieAnimation";

function BasicPopup(props) {
  const { lottieName = "", title, message } = props.payload;
  function getAnimationByName() {}
  return (
    <SlidePopup className={styles["basic-popup"]} extraStyles={styles}>
      {lottieName && (
        <div className={styles["lottie-animation"]}>
          <LottieAnimation animation={getAnimationByName()} />
        </div>
      )}

      {title && <h3 className={styles["title"]}>{title}</h3>}
      {message && <span className={styles["message"]}>{message}</span>}
    </SlidePopup>
  );
}

export default BasicPopup;
