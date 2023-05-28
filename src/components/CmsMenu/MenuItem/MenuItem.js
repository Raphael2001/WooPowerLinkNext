"use client";

import ActiveLinkMenus from "components/Navigation/ActiveLinkMenus/ActiveLinkMenus";
import { React } from "react";

import styles from "./MenuItem.module.scss";

function MenuItem(props) {
  const { item = {} } = props;

  return (
    <ActiveLinkMenus
      href={item.route}
      className={`${styles["sidebar-menu-link"]}`}
      activeClassName={styles["active"]}
      menus={item.menus}
    >
      <span className={styles["sidebar-menu-link-text"]}>{item.text}</span>
    </ActiveLinkMenus>
  );
}

export default MenuItem;
