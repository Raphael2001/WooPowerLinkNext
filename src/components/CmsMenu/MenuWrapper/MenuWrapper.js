"use client";

import { React, useEffect } from "react";
import { useSelector } from "react-redux";

import SideBarMenu from "components/CmsMenu/SideBarMenuCms/SideBarMenu";
import CMSHeader from "components/CmsMenu/CmsHeader/cmsheader";
import Api from "api/requests";

import styles from "./MenuWrapper.module.scss";
import BurgerMenu from "../CmsHeader/BurgerMenu/BurgerMenu";
import WithAuthCMS from "components/WithAuthCms/WithAuthCms";

function MenuWrapper(props) {
  const { children } = props;
  const deviceState = useSelector((store) => store.deviceState);
  const isBurgerOpen = useSelector((store) => store.burgerState);
  const userData = useSelector((store) => store.userData);

  useEffect(() => {
    if (userData) {
      Api.Init();
    }
  }, []);

  return (
    <>
      <BurgerMenu />

      <div
        className={`${styles["menu-wrapper"]} ${
          isBurgerOpen ? styles["burger-open"] : ""
        }`}
      >
        {deviceState.notDesktop && <CMSHeader />}
        <div className={`${styles["sidebar-cms"]}`}>
          {deviceState.isDesktop && <SideBarMenu />}
          <div className={styles["cms"]}>{children}</div>
        </div>
      </div>
    </>
  );
}

export default WithAuthCMS(MenuWrapper);
