"use client";

import MenuItem from "components/CmsMenu/MenuItem/MenuItem";
import { React, useState } from "react";
import ActiveLink from "../ActiveLink/ActiveLink";

import styles from "./ActiveLinkMenus.module.scss";

function ActiveLinkMenus(props) {
  const { menus = [], ...rest } = props;

  const [isActive, setIsActive] = useState(false);

  return (
    <div className={styles["active-menu-link"]}>
      <ActiveLink
        {...rest}
        includes={true}
        updateIsActive={setIsActive}
        fullyActive
      />
      {isActive &&
        menus &&
        menus.map((item, index) => {
          return <MenuItem item={item} key={"item-sub-link-" + index} />;
        })}
    </div>
  );
}

export default ActiveLinkMenus;
