"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Api from "api/requests";
import Actions from "redux/actions";

import styles from "./general.module.scss";
import CmsButton from "components/CmsButton/CmsButton";
import Languages from "components/Languages/Languages";
import AutoGrowTextArea from "components/forms/AutoGrowTextArea/AutoGrowTextArea";
import CmsMutliGeneralInfo from "components/CmsMutliGeneralInfo/CmsMutliGeneralInfo";
export default function GeneralPage() {
  const mails = useSelector((store) => store.init?.mail);

  const [form, setForm] = useState({
    mail: "",
    langId: "",
    langName: "",
  });

  function onChangeForm(e) {
    const { value, name } = e.target;

    const newState = { ...form };
    newState[name] = value;
    setForm(newState);
  }

  return (
    <div className={styles["general-info-wrapper"]}>
      <Languages form={form} onChangeForm={onChangeForm} setForm={setForm} />
      <CmsMutliGeneralInfo
        values={mails}
        title="מיילים"
        subtitle={"לא יוצג ללקוח"}
        name="mail"
      />
    </div>
  );
}

function GeneralRow(props) {
  const { name, value, id, title, saveAsObjId = false } = props;
  const [currentValue, setCurrentValue] = useState(value);
  const dispatch = useDispatch();

  function onChange(e) {
    const { value } = e.target;
    setCurrentValue(value);
  }

  function updateGeneral() {
    const payload = {
      id: id,
      name: name,
      value: currentValue,
      save_as_obj_id: saveAsObjId,
      multi_values: false,
    };

    function onSuccess(data) {
      dispatch(
        Actions.addNotification({
          type: NotificationsTypes.SUCCCESS,
          payload: { title: "עודכן בהצלחה", text: "המידע עודכן בהצלחה" },
        })
      );
    }

    Api.updateGeneralInfo({ payload, onSuccess });
  }

  return (
    <div className={styles["general-info-row"]}>
      <span className={styles["general-info-name"]}>{title}</span>
      <div className={styles["input-wrapper"]}>
        <AutoGrowTextArea
          value={currentValue}
          onChange={onChange}
          className={styles["input"]}
        />
      </div>
      <div className={styles["btn-wrapper"]}>
        <CmsButton className="update" title={"עדכן"} onClick={updateGeneral} />
      </div>
    </div>
  );
}
