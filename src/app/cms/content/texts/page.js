"use client";
import React from "react";
import Api from "api/requests";

import { useDispatch, useSelector } from "react-redux";

import Actions from "redux/actions";
import POPUP_TYPES from "constants/popup-types";

import styles from "./texts.module.scss";

import CmsButton from "components/CmsButton/CmsButton";

export default function TextsPage(props) {
  const texts = useSelector((store) => store.init?.texts);

  const dispatch = useDispatch();

  function openPopup() {
    dispatch(
      Actions.addPopup({
        type: POPUP_TYPES.TEXTS,
        payload: {},
      })
    );
  }

  return (
    <div className={styles["all-text-wrapper"]}>
      <div className={styles["add-buttom-wrapper"]}>
        <CmsButton
          onClick={openPopup}
          title={"הוסף"}
          className="create"
          extraStyles={styles}
        />
      </div>

      <div className={styles["header"]}>
        <div className={styles["header-title"]}>מפתח</div>

        <div className={styles["header-title"]}>פעולות</div>
      </div>

      {texts &&
        Object.keys(texts).map((key) => {
          return (
            <TextField
              className={styles["new-text-wrapper"]}
              key={key}
              textKey={key}
              valueProps={texts[key]}
            />
          );
        })}
    </div>
  );
}

function TextField(props) {
  const { className = "", textKey = "" } = props;
  const dispatch = useDispatch();

  function deleteText() {
    const payload = { key: textKey };
    Api.deleteText({ payload });
  }

  function openPopup(key) {
    dispatch(
      Actions.addPopup({
        type: POPUP_TYPES.TEXTS,
        payload: { keyProps: key },
      })
    );
  }

  return (
    <div className={`${styles["text-field-wrapper"]} ${className}`}>
      <div className={styles["key"]}>{textKey}</div>

      <div className={styles["button-wrapper"]}>
        <CmsButton
          onClick={() => openPopup(textKey)}
          className="update"
          title={"עדכן"}
          extraStyles={styles}
        />
        <CmsButton
          onClick={deleteText}
          className="delete"
          title={"מחק"}
          extraStyles={styles}
        />
      </div>
    </div>
  );
}
