import React from "react";
import { Notification } from "components/Notifications/notifications";

import Icon from "assets/icons/notifications/warn.svg";
import styles from "./WarnNotification.module.scss";

export default function WarnNotification(props) {
  const { payload } = props;
  return (
    <Notification
      {...payload}
      icon={Icon.src}
      className={styles["warn"]}
      extraStyles={styles}
    />
  );
}
