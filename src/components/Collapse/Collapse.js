"use client";
import React, { useEffect, useRef } from "react";

import styles from "./Collapse.module.scss";

function Collapse(props) {
  const contentRef = useRef();

  const { open = false } = props;

  const style = {};
  if (open && contentRef.current) {
    const height = contentRef.current.clientHeight;
    style.height = height;
  }

  return (
    <div className={styles["collapse-wrapper"]} style={style}>
      <div className={styles["collapse-content"]} ref={contentRef}>
        {props.children}
      </div>
    </div>
  );
}

export default Collapse;
