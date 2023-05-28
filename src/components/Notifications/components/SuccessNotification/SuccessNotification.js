import React from "react";
import { Notification } from "components/Notifications/notifications";

import Icon from "assets/icons/notifications/check.svg";
import styles from "./SuccessNotification.module.scss";

export default function SuccessNotification(props) {
  const { payload } = props;
  return (
    <Notification {...payload} icon={Icon.src} className={styles["success"]}       extraStyles={styles}
    />
  );
}
