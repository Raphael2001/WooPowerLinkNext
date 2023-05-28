"use client";

import { useEffect } from "react";
//redux
import { Provider } from "react-redux"; // Redux HOC
import Store from "../../redux/index";

import DeviceState from "utils/deviceState";

export default function Providers({ children }) {
  useEffect(() => {
    DeviceState.init();
  }, []);
  return <Provider store={Store}>{children}</Provider>;
}
