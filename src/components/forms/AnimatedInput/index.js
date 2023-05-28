import React from "react";

import basic from "./index.module.scss";

/**
 *
 ## Animated input
 ## Input with animated place holder
 ##    parameters:
 ###      showError    - true / false, true = showing the error message
 ###      errorMessage - If input is wrong, show this text message
 ###      placeholder  - the animated string inside the input
 ###      onChange     - Needed to change the value
 ###      className    - Adding new class
 ###      autocomplete - true / false
 ###      value        - input value
 ###      name         - input name
 ###      type         - input type

**/

function AnimatedInput(props) {
  /*
        Props
    */
  const {
    id,
    autocomplete = true,
    placeholder = "",
    errorMessage,
    value = "",
    className,
    showError,
    type,
    name,
    extraStyles = {},
    disabled = false,
  } = props;

  function styles(className) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  /*
        Text stay animated when input is not undefined
    */
  const animatedPlaceholder = (e) => {
    props.onChange(e);
  };

  const isAnimated = value !== "";

  return (
    // Input wrapper
    <div
      className={`${styles("animated-input-wrapper")} ${
        disabled ? styles("disabled") : ""
      }  ${styles(className)}`}
    >
      {/* Input */}
      <input
        onChange={(e) => animatedPlaceholder(e)}
        autoComplete={autocomplete ? "" : "new-password"}
        className={styles("input")}
        value={value}
        pattern={type === "number" ? "[0-9]*" : ".{0,}"}
        name={name}
        id={id}
        type={type}
      />
      {/* Placeholder */}
      <label
        htmlFor={id}
        className={`${styles("placeholder")}  ${
          !isAnimated ? "" : styles("animated")
        }`}
      >
        {placeholder}
      </label>

      {/* Error message */}
      {showError && (
        <span className={styles("error-text")}>{errorMessage}</span>
      )}
    </div>
  );
}

export default AnimatedInput;
