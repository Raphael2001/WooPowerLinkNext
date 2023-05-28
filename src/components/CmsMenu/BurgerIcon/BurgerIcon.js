"use client";

import { React } from "react";

import basic from "./BurgerIcon.module.scss";

function BurgerIcon(props) {
  const { extraStyles = {}, onClick, isOpen = false } = props;

  function styles(className) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  return (
    <button
      onClick={onClick}
      className={`${styles("navbar-toggler")} ${isOpen ? styles("open") : ""}`}
      type="button"
    >
      <label className={styles("label")}>
        <span className={styles("burger")}></span>
      </label>
    </button>
  );
}

export default BurgerIcon;
