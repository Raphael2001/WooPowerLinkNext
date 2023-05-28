"use client";

import React, { useState } from "react";

import styles from "./CmsMutliGeneralInfo.module.scss";
import CmsInput from "components/forms/CmsInput/CmsInput";
import CmsButton from "components/CmsButton/CmsButton";
import Api from "api/requests";

function CmsMutliGeneralInfo(props) {
  const { title, subtitle, values = [], name = "" } = props;
  const [input, setInput] = useState("");

  function onChangeInput(e) {
    const { value } = e.target;

    setInput(value);
  }

  function addGeneralInfo() {
    function onSuccess() {
      setInput("");
    }

    const payload = { name, value: input, multi_values: true };
    Api.addGeneralInfo({ payload, onSuccess });
  }

  return (
    <div className={styles["general-info-multi"]}>
      <h3 className={`${styles["general-info-title"]}`}>{title}</h3>
      <span className={styles["general-info-subtitle"]}>{subtitle}</span>

      <div
        className={`${styles["new-general-info-row"]} ${styles["general-info-row"]}`}
      >
        <div className={styles["input-wrapper"]}>
          <CmsInput
            onChange={onChangeInput}
            value={input}
            className={styles["input"]}
          />
        </div>
        <div className={styles["btn-wrapper"]}>
          <CmsButton
            title={"הוסף"}
            className="create"
            extraStyles={styles}
            onClick={addGeneralInfo}
          />
        </div>
      </div>
      {values &&
        values.map((item, index) => {
          return <Row key={"general-info-" + index} item={item} />;
        })}
    </div>
  );
}

export default CmsMutliGeneralInfo;

function Row(props) {
  const { item } = props;

  function deleteGeneralInfo() {
    const payload = { id: item._id };
    Api.deleteGeneralInfo({ payload });
  }

  return (
    <div className={styles["general-info-row"]}>
      <div className={styles["data-value-wrapper"]}>
        <span className={styles["data-value"]}>{item.value}</span>
      </div>
      <div className={styles["btn-wrapper"]}>
        <CmsButton
          title={"מחק"}
          className="delete"
          extraStyles={styles}
          onClick={deleteGeneralInfo}
        />
      </div>
    </div>
  );
}
