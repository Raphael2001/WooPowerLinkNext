import React from "react";
import { useDispatch, useSelector } from "react-redux";

import burger from "assets/icons/burger.svg";

import Actions from "redux/actions";


import styles from "./cmsheader.module.scss";
import BurgerIcon from "../BurgerIcon/BurgerIcon";

export default function CMSHeader() {
  const dispatch = useDispatch();
  const isBurgerOpen = useSelector((store) => store.burgerState);

  const handleBurgerClick = () => {
    dispatch(Actions.setBurger(true));
  };

  return (
    <header className={styles["cms-header"]}>
      <div className={styles["burger-wrapper"]}>
        <BurgerIcon onClick={handleBurgerClick} isOpen={isBurgerOpen} />
      </div>
      <div className={styles["title-wrapper"]}>
        <span className={styles["title"]}>ממשק ניהול</span>
      </div>
      <div className={styles["empty"]}></div>
    </header>
  );
}
