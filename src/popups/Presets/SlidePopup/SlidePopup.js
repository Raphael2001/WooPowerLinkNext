"use client";

import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";

import Actions from "redux/actions";

import basic from "./SlidePopup.module.scss";
import XIcon from "assets/icons/close-icon.svg";

const SlidePopupRef = (props, ref) => {
  const {
    showCloseIcon = false,
    children,
    className = "",
    animateOutCallback = () => {},
    extraStyles = {},
  } = props;

  const [animationClass, setAminationClass] = useState("");
  const dispatch = useDispatch();
  const modalRef = useRef();
  const initialY = useRef();

  useImperativeHandle(ref, () => ({
    animateOut,
  }));

  useEffect(() => {
    animateIn();
  }, []);

  function styles(className) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  const completeAnimation = () => {
    if (animationClass !== "exit" && animationClass !== "done") {
      setAminationClass("done");
    }
  };

  function animateIn() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAminationClass("active");
      });
    });
  }
  const animateOut = (callback) => {
    setAminationClass("exit");
    setTimeout(() => {
      if (callback) {
        callback();
      }

      dispatch(Actions.removePopup());
    }, 200);
  };

  function handleOnTouchStart(e) {
    // Get TouchEvent ClientY

    const clientY = Math.round(e.changedTouches[0].clientY);
    initialY.current = clientY;
  }

  function handleOnTouchRelease(e) {
    const clientY = e.changedTouches[0].clientY;

    if (window.innerHeight - window.innerHeight / 5 <= clientY) {
      animateOut();
    } else {
      modalRef.current.style.top = `0px`;
    }
  }

  function onTouchMove(e) {
    const clientY = e.changedTouches[0].clientY;
    if (clientY > initialY.current) {
      modalRef.current.style.top = `${Math.abs(initialY.current - clientY)}px`;
    }
  }

  return (
    <div
      className={`backdrop ${styles(
        "slide-popup"
      )} ${className} ${animationClass} `}
      onClick={() => animateOut(animateOutCallback)}
      onTransitionEnd={completeAnimation}
    >
      <div
        className={`${styles("popup_wrapper")} ${styles(animationClass)}`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
        <div
          className={styles("gesture-handler")}
          onTouchMove={(e) => onTouchMove(e)}
          onTouchEnd={(e) => handleOnTouchRelease(e)}
          onTouchStart={(e) => handleOnTouchStart(e)}
        />
        {showCloseIcon && (
          <div
            className={styles("close-icon-wrapper")}
            onClick={() => animateOut(animateOutCallback)}
          >
            <img src={XIcon.src}></img>
          </div>
        )}

        {children && <div className={styles("popup_content")}>{children}</div>}
      </div>
    </div>
  );
};
const SlidePopup = forwardRef(SlidePopupRef);

export default SlidePopup;
