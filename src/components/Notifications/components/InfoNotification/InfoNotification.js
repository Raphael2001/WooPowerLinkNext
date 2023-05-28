import React from "react";
import { Notification } from "components/Notifications/notifications";

import Icon from "assets/icons/notifications/info.svg";
import styles from "./InfoNotification.module.scss";

export default function InfoNotification(props) {
  const { payload } = props;
  return (
    <Notification
      {...payload}
      icon={Icon.src}
      className={styles["info"]}
      extraStyles={styles}
    />
  );
}
