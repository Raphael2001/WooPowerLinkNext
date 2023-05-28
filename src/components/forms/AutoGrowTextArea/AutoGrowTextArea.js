"use client";

import { React, useEffect, useRef } from "react";

import basic from "./AutoGrowTextArea.module.scss";

function AutoGrowTextArea(props) {
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
  const textArea = useRef();

  useEffect(() => {
    if (value && textArea.current) {
      textArea.current.style.height = "inherit";
      textArea.current.style.height = `${textArea.current.scrollHeight}px`;
    }
  }, [textArea.current, value]);

  function styles(className) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  function onChangeHandler(e) {
    typeof onChange === "function" && onChange(e);
  }

  return (
    <div
      className={`${styles("text-area-wrapper")} ${className} ${
        disabled ? styles("disabled") : ""
      }`}
    >
      <textarea
        ref={textArea}
        rows="1"
        onChange={onChangeHandler}
        value={value}
        className={`${styles("text-area")} `}
        name={name}
        id={id}
        type={type}
        pattern={type === "number" ? "[0-9]*" : ".{0,}"}
        disabled={disabled}
        placeholder={placeholder}
      />

      {showError && (
        <span className={styles("cms-error-message")}>{errorMessage}</span>
      )}
    </div>
  );
}

export default AutoGrowTextArea;
