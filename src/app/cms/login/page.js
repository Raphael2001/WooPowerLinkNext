"use client";
import Api from "api/requests";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Validate from "utils/validation/validation";
import Actions from "redux/actions";

import UserIcon from "assets/icons/male-user.png";
import AnimatedInput from "components/forms/AnimatedInput";

import styles from "./cmslogin.module.scss";
import { useRouter } from "next/navigation";
import { Routes } from "constants/routes";

export default function Login() {
  const cmsLoginForm = useSelector((store) => store.cmsLoginForm);
  const tokens = useSelector((store) => store.tokens);
  const dispatch = useDispatch();
  const [firstTry, setFirstTry] = useState(true);
  const router = useRouter();
  const [formClassName, setFormClassName] = useState("");

  const [formValidate, setFormValidate] = useState({
    username: {
      valid: false,
      errMsg: "",
      rules: ["not_empty"],
    },
    password: {
      valid: false,
      errMsg: "",
      rules: ["not_empty"],
    },
  });

  useEffect(() => {
    if (tokens.accessToken) {
      router.push(Routes.cmsHome);
    }
  }, [tokens]);

  function onChange(e) {
    const { value, name } = e.target;

    const validationObj = Validate(value, formValidate[name].rules);

    const newState = { ...formValidate };
    newState[name].valid = validationObj.valid;
    newState[name].errMsg = validationObj.msg;

    setFormValidate(newState);

    dispatch(Actions.updateCmsLoginForm({ [name]: value }));
  }

  function showError(field) {
    return !firstTry && !formValidate[field].valid;
  }

  function onSubmit() {
    let formValid = true;
    const newState = { ...formValidate };
    let validationObj;

    for (const field in formValidate) {
      validationObj = Validate(cmsLoginForm[field], formValidate[field].rules);

      newState[field].valid = validationObj.valid;
      newState[field].errMsg = validationObj.msg;

      if (!validationObj.valid) {
        formValid = false;
      }
    }

    setFormValidate(newState);
    setFirstTry(false);

    if (formValid) {
      onSubmitSuccess();
    }
  }
  function onSubmitSuccess() {
    const payload = {
      username: cmsLoginForm.username,
      password: cmsLoginForm.password,
    };
    Api.login({ payload });
  }

  return (
    <div className={styles["cms-login-wrapper"]}>
      <div className={styles["login-form-blur"]} />

      <div
        className={`${styles["login-form-wrapper"]} ${formClassName}`}
        onAnimationEnd={() => setFormClassName(styles["end"])}
      >
        <div className={styles["buttons"]}>
          <div className={styles["item-button-red"]} />
          <div className={styles["item-button-yellow"]} />
          <div className={styles["item-button-green"]} />
        </div>
        <div className={styles["user-icon"]}>
          <img src={UserIcon.src} />
        </div>
        <div className={styles["inputs"]}>
          <AnimatedInput
            id="username"
            placeholder="שם משתמש"
            value={cmsLoginForm.username}
            name="username"
            className={["login-input"]}
            onChange={onChange}
            showError={showError("username")}
            errorMessage={formValidate.username.errMsg}
            extraStyles={styles}
          />
          <AnimatedInput
            id="password"
            placeholder="סיסמא"
            value={cmsLoginForm.password}
            name="password"
            className={["login-input"]}
            onChange={onChange}
            showError={showError("password")}
            errorMessage={formValidate.password.errMsg}
            type={"password"}
            extraStyles={styles}
          />
        </div>
        <div className={styles["actions"]}>
          <button className={styles["login-btn"]} onClick={onSubmit}>
            התחברות
          </button>
        </div>
      </div>
    </div>
  );
}
