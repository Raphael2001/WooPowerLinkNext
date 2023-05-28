"use client";

import AnimatedInput from "components/forms/AnimatedInput";
import AutoGrowTextArea from "components/forms/AutoGrowTextArea/AutoGrowTextArea";
import CmsInput from "components/forms/CmsInput/CmsInput";
import CustomDatePicker from "components/forms/NewDatePicker/CustomDatePicker";
import TimePicker from "components/forms/TimePicker/TimePicker";
import Switch from "components/Switch/Switch";
import TableCreator from "components/TableCreator/TableCreator";
import POPUP_TYPES from "constants/popup-types";
import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Actions from "redux/actions";

import styles from "./test.module.scss";

function Test() {
  const [date, setDate] = useState();

  function onChange(e) {
    const { value } = e.target;

    setDate(value);
  }

  return (
    <div className={styles["wraper"]}>
      {/* <AutoGrowTextArea
        value={date}
        onChange={onChange}
        placeholder={"kjdkfjdk"}
      /> */}
    </div>
  );
}

export default Test;
