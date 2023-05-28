import React from "react";

import basic from "./Switch.module.scss";
import {combineClassNames} from "utils/functions";
function Switch(props) {
  const { state, onClick, name, extraStyles = {}, className } = props;

  function onSwitchPress() {
    onClick(name, !state);
  }

  function styles(className) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  return (
    <div
      className={combineClassNames(
          styles("switch-wrapper"),
          state ? styles("on") : styles("off"),
          className
      )}
      onClick={onSwitchPress}
    >
      <div className={styles("indicator")} />
    </div>
  );
}

export default Switch;
