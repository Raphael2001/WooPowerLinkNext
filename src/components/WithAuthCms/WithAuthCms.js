"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Routes } from "constants/routes";

export default function WithAuthCMS(WrappedComponent) {
  const CMS = (props) => {
    const router = useRouter();
    const userData = useSelector((store) => store.userData);
    const tokens = useSelector((store) => store.tokens);

    if (typeof window !== "undefined") {
      // If there is no access token we redirect to "/" page.
      if (!tokens.accessToken) {
        router.replace(Routes.cmsLogin);
        return null;
      }
      return <WrappedComponent {...props} />;
    }
    return null;
  };
  return CMS;
}
