"use client";

import { forwardRef, React, useEffect, useImperativeHandle } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = (props) => {
  const {
    includes = false,
    children,
    className = () => {},
    activeClassName = "",
    href = "",
    updateIsActive = () => {},
    fullyActive = false,
    ...rest
  } = props;
  const pathname = usePathname();
  const isFullyActive = pathname === href;
  const isActive = includes ? pathname.includes(href) : isFullyActive;

  useEffect(() => {
    typeof updateIsActive === "function" && updateIsActive(isActive);
  }, [isActive]);

  let activeClassNameText = "";
  if (fullyActive) {
    activeClassNameText = isFullyActive ? activeClassName : "";
  } else {
    activeClassNameText = isActive ? activeClassName : "";
  }
  return (
    <Link
      href={href}
      className={`${className} ${activeClassNameText}`}
      {...rest}
    >
      {children && children}
    </Link>
  );
};

export default ActiveLink;
