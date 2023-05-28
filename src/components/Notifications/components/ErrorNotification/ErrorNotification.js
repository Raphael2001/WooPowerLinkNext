import React from "react";

import Icon from "assets/icons/notifications/error.svg";
import styles from "./ErrorNotification.module.scss";
import { Notification } from "components/Notifications/notifications";

export default function ErrorNotification(props) {
  const { payload } = props;
  return (
    <Notification
      {...payload}
      icon={Icon.src}
      className={styles["error"]}
      extraStyles={styles}
    />
  );
}
