"use client";
import React from "react";

import basic from "./CmsInput.module.scss";

function CmsInput(props) {
  const {
    value,
    onChange,
    id = "",
    name = "",
    className = "",
    placeholder = "",
    type = "",
    disabled = false,
    showError = false,
    errorMessage = "",
    extraStyles = {},
  } = props;

  function styles(className) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  return (
    <div className={`${styles("cms-input-wrapper")} ${className}`}>
      <input
        value={value}
        onChange={onChange}
        name={name}
        id={id}
        className={`${styles("cms-input")} ${
          disabled ? styles("disabled") : ""
        }`}
        placeholder={placeholder}
        type={type}
        pattern={type === "number" ? "[0-9]*" : ".{0,}"}
        disabled={disabled}
      />
      {showError && (
        <span className={styles("cms-error-message")}>{errorMessage}</span>
      )}
    </div>
  );
}

export default CmsInput;
