"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ErrorNotification from "./components/ErrorNotification/ErrorNotification";
import WarnNotification from "./components/WarnNotification/WarnNotification";
import SuccessNotification from "./components/SuccessNotification/SuccessNotification";
import InfoNotification from "./components/InfoNotification/InfoNotification";

import Actions from "redux/actions";
import NotificationsTypes from "constants/NotificationsTypes";

import CloseIcon from "assets/icons/close-icon.svg";
import basic from "./notifications.module.scss";

function Notifications(props) {
  const notificationsArray = useSelector((store) => store.notificationsArray);

  function getNotificationByType(notification) {
    const { type, payload } = notification;
    const { id } = payload;

    const notificationComponents = {
      [NotificationsTypes.ERROR]: (
        <ErrorNotification key={id} payload={payload} />
      ),
      [NotificationsTypes.WARN]: (
        <WarnNotification key={id} payload={payload} />
      ),
      [NotificationsTypes.SUCCCESS]: (
        <SuccessNotification key={id} payload={payload} />
      ),
      [NotificationsTypes.INFO]: (
        <InfoNotification key={id} payload={payload} />
      ),
    };
    const notificatiosToReturn =
      type in notificationComponents ? (
        notificationComponents[type]
      ) : (
        <InfoNotification key={id} payload={payload} />
      );
    return notificatiosToReturn;
  }

  const renderNotifications = () => {
    return [...notificationsArray]
      .reverse()
      .map((notificationData) => getNotificationByType(notificationData));
  };

  return (
    <div className={basic["notifications-container"]}>
      {renderNotifications()}
    </div>
  );
}

export default Notifications;

export function Notification(props) {
  const {
    id,
    title,
    text,
    icon,
    timer = 2000,
    className = "",
    extraStyles = {},
  } = props;

  const [animationClass, setAminationClass] = useState("");
  const dispatch = useDispatch();

  function styles(className) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  useEffect(() => {
    animateIn();

    const timeout = setTimeout(() => {
      animateOut();
    }, timer);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function completeAnimation() {
    if (animationClass !== "exit" && animationClass !== "done") {
      setAminationClass("done");
    }

    if (animationClass === "exit") {
      dispatch(Actions.removeNotification(id));
    }
  }

  function animateIn() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAminationClass("active");
      });
    });
  }

  function animateOut() {
    setAminationClass("exit");
  }

  return (
    <div
      className={`${styles("notification-wrapper")} ${styles(
        animationClass
      )}  ${className}`}
      onTransitionEnd={completeAnimation}
    >
      <div className={styles("continer")}>
        <div className={styles("close-icon")} onClick={animateOut}>
          <img src={CloseIcon.src} alt={"close"} />
        </div>

        {icon && (
          <div className={styles("icon-wrapper")}>
            <img src={icon} alt={"notification-icon"} />
          </div>
        )}
        <div className={styles("text-wrapper")}>
          {title && <span className={styles("title")}>{title}</span>}
          {text && <span className={styles("text")}>{text}</span>}
        </div>
      </div>
    </div>
  );
}
