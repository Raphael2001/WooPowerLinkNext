"use client";

import { React } from "react";

import styles from "./CmsSideBar.module.scss";

import { menuList } from "constants/cms-menu";

import MenuItem from "../MenuItem/MenuItem";

function CmsSideBar(props) {
  return (
    <div className={styles["sidebar-menu-list"]}>
      {menuList.map((item, index) => (
        <MenuItem key={"item-link-" + index} item={item} />
      ))}
    </div>
  );
}

export default CmsSideBar;
