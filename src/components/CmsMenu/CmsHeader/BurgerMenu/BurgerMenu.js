import React from "react";
import { useSelector, useDispatch } from "react-redux";

// import actions
import Actions from "redux/actions";
import styles from "./BurgerMenu.module.scss";

import CmsSideBar from "components/CmsMenu/CmsSidebar/CmsSideBar";
import LogoutButton from "components/CmsMenu/LogoutButton/LogoutButton";

export default function BurgerMenu(props) {
  const state = useSelector((store) => store.burgerState);
  const dispatch = useDispatch();

  const handleCloseClick = () => {
    dispatch(Actions.setBurger(false));
  };

  return (
    <div
      className={`${styles["burger-menu-wrapper"]}  ${
        state ? styles["active"] : ""
      }`}
    >
      <div className={styles["burger-menu-wrapper"]}>
        <div className={styles["backdrop"]} onClick={handleCloseClick} />
        <div className={styles["burger-menu"]}>
          <CmsSideBar />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
