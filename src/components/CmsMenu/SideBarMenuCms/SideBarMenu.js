"use client";
import React from "react";

import styles from "./SideBarMenu.module.scss";


import CmsSideBar from "../CmsSidebar/CmsSideBar";
import LogoutButton from "../LogoutButton/LogoutButton";

export default function SideBarMenu(props) {


  return (
    <div className={styles["sidebar-wrapper"]}>
      <div className={styles["sidebar-container"]}>
        <div className={styles["title-wrapper"]}>
          <span className={styles["title"]}>ממשק ניהול</span>
        </div>
        <div className={styles["divider"]}></div>
        <CmsSideBar />
      </div>
      <LogoutButton />
    </div>
  );
}
