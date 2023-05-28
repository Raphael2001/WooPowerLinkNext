import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import he from "date-fns/locale/he";

import "react-datepicker/dist/react-datepicker.css";
import styles from "./CustomDatePicker.module.scss";

import ArrowUp from "assets/icons/drop-down.svg";
import ChooseDate from "./ChooseDate/ChooseDate";

function* range(_start_, _end_) {
  for (let h = _start_; h <= _end_; h++) {
    yield h;
  }
}

function getYear(date) {
  return date?.getFullYear()?.toString();
}
function getMonth(date) {
  return months[date.getMonth()];
}

function getDate(currentDate) {
  if (currentDate) {
    return (
      currentDate.getDate() +
      "/" +
      ("0" + (currentDate.getMonth() + 1)).slice(-2) +
      "/" +
      getYear(currentDate)
    );
  }
}

const months = [
  "ינואר",
  "פברואר",
  "מרץ",
  "אפריל",
  "מאי",
  "יוני",
  "יולי",
  "אוגוסט",
  "ספטמבר",
  "אוקטובר",
  "נובמבר",
  "דצמבר",
];

function CustomDatePicker(props) {
  const {
    date,
    minDate = new Date(),
    label = "",
    icon,
    disabled = false,
    name = "",
    onChange = () => {},
    isOpenAtStart = false,
    onDateSelect = () => {},
    className = "",
    startYear = minDate?.getFullYear(),
    endYear = startYear + 5,
  } = props;

  const [years, setYears] = useState([]);
  const [isOpen, setIsOpen] = useState(isOpenAtStart);
  const [isDateSelected, setIsDateSelected] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [showSelectMonth, setShowSelectMonth] = useState(false);
  const [showSelectYear, setShowSelectYear] = useState(false);

  useEffect(() => {
    if (date) {
      setIsDateSelected(true);
      setIsFloating(true);
    } else {
      setIsDateSelected(false);
      setIsFloating(false);
    }
  }, [date]);

  useEffect(() => {
    const years = [];
    for (const h of range(startYear, endYear)) {
      years.push(h);
    }
    setYears(years);
  }, []);

  function onBtnClickHandler() {
    setIsOpen((prevState) => !prevState);
  }

  function onMonthSelectHandler(changeMonthFunction, month) {
    changeMonthFunction(months.indexOf(month));
    setShowSelectMonth(false);
  }
  function onYearSelectHandler(changeYearFunction, year) {
    changeYearFunction(year);
    setShowSelectYear(false);
    setShowSelectMonth(true);
  }
  function onMonthClick() {
    setShowSelectMonth((prevState) => !prevState);
    setShowSelectYear(false);
  }
  function onYearClick() {
    setShowSelectMonth(false);
    setShowSelectYear((prevState) => !prevState);
  }
  function onClickTodayButton() {
    setShowSelectYear(false);
    setShowSelectMonth(false);
    onDateSelectHandler(new Date());
  }

  function onDateSelectHandler(date) {
    onChange(name, date);
    setIsOpen(false);
    onDateSelect();
  }

  const isFloatingClassName = isFloating ? "floating" : "";
  const isOpenMonthYear = showSelectYear || showSelectMonth;
  const isDisabledClassName = disabled ? "disabled" : "";
  const showSelectMonthClassName = showSelectMonth ? "show" : "";
  const showSelectYearClassName = showSelectYear ? "show" : "";
  const isOpenMonthYearClassName = isOpenMonthYear
    ? "open-year-month-select"
    : "";

  return (
    <div
      className={`${styles["custom-datepicker-wrapper"]} ${
        styles[isDisabledClassName]
      } ${styles[isOpenMonthYearClassName]} ${className} ${
        isOpen ? styles["active"] : ""
      }
       `}
    >
      {isOpen && (
        <div className={styles["backdrop"]} onClick={onBtnClickHandler} />
      )}

      <div
        className={styles["custom-datepicker-btn-wrapper"]}
        onClick={onBtnClickHandler}
      >
        <div
          className={`${styles["custom-datepicker-btn"]} ${styles[isFloatingClassName]}`}
        >
          {label}
        </div>
        {isDateSelected && (
          <span className={"custom-datepicker-date-selected"}>
            {getDate(date)}
          </span>
        )}
        {icon && (
          <div className={styles["custom-datepicker-icon"]}>
            <img src={icon} alt="" />
          </div>
        )}
      </div>
      {isOpen && (
        <div className={styles["custom-datepicker"]}>
          <DatePicker
            open={isOpen}
            onClickOutside={onBtnClickHandler}
            selected={date}
            locale={he}
            rtl
            shouldCloseOnSelect={true}
            minDate={minDate}
            onChange={(date) => {
              onDateSelectHandler(date);
            }}
            disabledKeyboardNavigation
            dayClassName={(date) =>
              new Date().getDate() === date.getDate() ? "selected" : ""
            }
            fixedHeight
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div className={styles["header-select"]}>
                <div className={styles["header-wrapper"]}>
                  <div className={styles["selected-month-year"]}>
                    <span
                      className={styles["selected-year"]}
                      onClick={onYearClick}
                    >
                      {getYear(date)}
                    </span>
                    <span
                      className={styles["selected-month"]}
                      onClick={onMonthClick}
                    >
                      {getMonth(date)}
                    </span>
                  </div>
                  <div className={styles["nav-months"]}>
                    <button
                      className={`${styles["btn-nav"]} ${
                        prevMonthButtonDisabled ? styles["disabled"] : ""
                      }`}
                      onClick={decreaseMonth}
                      disabled={prevMonthButtonDisabled}
                    >
                      <img
                        className={styles["arrow-up"]}
                        src={ArrowUp.src}
                      />
                    </button>
                    <button
                      className={`${styles["btn-nav"]} ${
                        nextMonthButtonDisabled ? styles["disabled"] : ""
                      }`}
                      onClick={increaseMonth}
                      disabled={nextMonthButtonDisabled}
                    >
                      <img
                        className={styles["arrow-down"]}
                        src={ArrowUp.src}
                      />
                    </button>
                  </div>
                </div>
                {isOpenMonthYear && (
                  <div className={styles["select-year-month"]}>
                    <div
                      className={`${styles["select-month"]}  ${styles[showSelectMonthClassName]}`}
                    >
                      <ChooseDate
                        options={months}
                        current={getMonth(date)}
                        changeFunction={changeMonth}
                        onSelect={onMonthSelectHandler}
                      />
                    </div>
                    <div
                      className={`${styles["select-year"]}  ${styles[showSelectYearClassName]}`}
                    >
                      <ChooseDate
                        options={years}
                        current={getYear(date)}
                        changeFunction={changeYear}
                        onSelect={onYearSelectHandler}
                      />
                    </div>
                    <button
                      className={styles["today-button"]}
                      onClick={onClickTodayButton}
                    >
                      היום
                    </button>
                  </div>
                )}
              </div>
            )}
          ></DatePicker>
        </div>
      )}
    </div>
  );
}

export default CustomDatePicker;
