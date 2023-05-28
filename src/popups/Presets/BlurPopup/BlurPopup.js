import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useDispatch } from "react-redux";

import Actions from "redux/actions";

import basic from "./BlurPopup.module.scss";
import XIcon from "assets/icons/x-icon.svg";

const BlurPopupRef = (props, ref) => {
  const {
    showCloseIcon = true,
    children,
    className = "",
    animateOutCallback = () => {},
    extraStyles = {},
  } = props;

  const [animationClass, setAminationClass] = useState("");
  const dispatch = useDispatch();
  const modalRef = useRef();

  function styles(className) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  useImperativeHandle(ref, () => ({
    animateOut,
  }));

  const animateIn = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setAminationClass("active");
      });
    });
  };
  useEffect(() => {
    animateIn();
  }, []);

  const completeAnimation = () => {
    if (animationClass !== "exit" && animationClass !== "done") {
      setAminationClass("done");
    }
  };
  const animateOut = (callback) => {
    setAminationClass("exit");
    setTimeout(() => {
      if (callback) {
        callback();
      }

      dispatch(Actions.removePopup());
    }, 200);
  };

  return (
    <div
      className={`backdrop ${styles("blur-popup")} ${className} ${styles(
        animationClass
      )} `}
      onClick={() => animateOut(animateOutCallback)}
      onTransitionEnd={completeAnimation}
    >
      <div
        className={`${styles("popup_wrapper")} ${styles(animationClass)}`}
        onClick={(e) => e.stopPropagation()}
        ref={modalRef}
      >
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
const BlurPopup = forwardRef(BlurPopupRef);

export default BlurPopup;
