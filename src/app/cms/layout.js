"use client";
import Api from "api/requests";
import LOCAL_STORAGE_KEYS from "constants/LocalStorage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Actions from "redux/actions";

export default function MainCMSLayout({ children }) {
  const [initialRequestsDone, setInitialRequestsDone] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN);
    if (token) {
      dispatch(Actions.setRefreshToken(token));
      Api.silentLogin({}).then(() => {
        setInitialRequestsDone(true);
      });
    } else {
      setInitialRequestsDone(true);
    }
  }, []);

  //todo: make a loader here
  return <>{initialRequestsDone ? children : null}</>;
}
