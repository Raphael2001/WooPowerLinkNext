"use client";

import { React } from "react";

import LogoutIcon from "assets/icons/logout.svg";
import styles from "./LogoutButton.module.scss";
import LOCAL_STORAGE_KEYS from "constants/LocalStorage";
import { useDispatch } from "react-redux";
import Actions from "redux/actions";

function LogoutButton(props) {
  const dispatch = useDispatch();

  function logout() {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    dispatch(Actions.resetTokens());
  }

  return (
    <div className={styles["logout-wrapper"]}>
      <button className={styles["logout-button"]} onClick={logout}>
        <div className={styles["logout-image"]}>
          <img src={LogoutIcon.src} />
        </div>
        <span className={styles["logout-title"]}>התנתקות</span>
      </button>
    </div>
  );
}

export default LogoutButton;
