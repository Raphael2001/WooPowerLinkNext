"use client";
import React, { useEffect, useState } from "react";
import {
  formatTime,
  getHoursByStartEnd,
  getMinutesByInterval,
} from "utils/functions";

import basic from "./TimePicker.module.scss";

function TimePicker(props) {
  const {
    startHour = 0,
    endHour = 23,
    minuteInterval = 15,
    selectedHour = startHour,
    selectedMinute = 0,
    icon,

    isOpenAtStart = false,
    isDisabled = false,
    onPicked = () => {},

    extraStyles = {},
  } = props;

  function styles(className) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  const [minutes, setMinutes] = useState([]);
  const [hours, setHours] = useState([]);
  const [isOpen, setIsOpen] = useState(isOpenAtStart);

  useEffect(() => {
    const minutes = getMinutesByInterval(minuteInterval);
    setMinutes(minutes);
  }, [minuteInterval]);

  useEffect(() => {
    const hours = getHoursByStartEnd(startHour, endHour);
    setHours(hours);
  }, [startHour, endHour]);

  function onMinutePickedHandler(minute) {
    typeof onPicked === "function" && onPicked("minute", minute);
  }
  function onHourPickedHandler(hour) {
    typeof onPicked === "function" && onPicked("hour", hour);
  }

  function togglePicker() {
    if (!isDisabled) {
      setIsOpen((prevState) => !prevState);
    }
  }

  function closePicker() {
    setIsOpen(false);
  }

  return (
    <div
      className={`
        ${styles("time-picker-wrapper")} ${
        isDisabled ? styles("disabled") : ""
      } ${isOpen ? styles("active") : ""}`}
    >
      {isOpen && <div className={styles("backdrop")} onClick={closePicker} />}
      <button className={styles("time-picked-button")} onClick={togglePicker}>
        {icon && (
          <div className={styles("clock-icon")}>
            <img src={icon} alt={"clock"} />
          </div>
        )}
        <span className={styles("time-picked")}>
          {formatTime(selectedMinute)} : {formatTime(selectedHour)}
        </span>
      </button>
      <div
        className={`${styles("time-picker-container")} ${
          isOpen ? styles("active") : ""
        }`}
      >
        <div className={styles("time-lists")}>
          <li className={styles("time-panel-column")}>
            {hours.map((hour, index) => {
              const isSelected = Number(hour) === Number(selectedHour);

              const onClicked = () => onHourPickedHandler(hour);
              return (
                <ul
                  className={`${styles("time-cell")}  ${
                    isSelected ? styles("selected") : ""
                  }`}
                  key={"hour-" + hour}
                  onClick={onClicked}
                >
                  <span className={styles("time-cell-inner")}>{hour}</span>
                </ul>
              );
            })}
          </li>
          <li className={styles("time-panel-column")}>
            {minutes.map((minute, index) => {
              const isSelected = Number(minute) === Number(selectedMinute);
              const onClicked = () => onMinutePickedHandler(minute);

              return (
                <ul
                  className={`${styles("time-cell")}  ${
                    isSelected ? styles("selected") : ""
                  }`}
                  key={"minute-" + minute}
                  onClick={onClicked}
                >
                  <span className={styles("time-cell-inner")}>{minute}</span>
                </ul>
              );
            })}
          </li>
        </div>
        <div className={styles("actions")} onClick={closePicker}>
          <button className={styles("ok-button")}>אישור</button>
        </div>
      </div>
    </div>
  );
}

export default TimePicker;
