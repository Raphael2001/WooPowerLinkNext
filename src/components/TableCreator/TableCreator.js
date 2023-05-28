import React, { useRef } from "react";
import { useSelector } from "react-redux";

import basic from "./TableCreator.module.scss";
function TableCreator(props) {
  const styleRef = useRef({});
  const {
    data = [],
    header,
    className = "",
    extraStyles = {},
    actions,
  } = props;
  const columWdith = 100 / Object.values(header).length;

  function styles(className) {
    return (basic[className] || "") + " " + (extraStyles[className] || "");
  }

  const deviceState = useSelector((store) => store.deviceState);

  if (deviceState.isDesktop) {
    styleRef.current = { width: `${columWdith || 20}%` };
  } else {
    styleRef.current = {};
  }

  const hasActions =
    typeof actions === "object" && Object.keys(actions).length > 0;
  return (
    <div className={`${styles("table-creator-wrapper")} ${className}`}>
      <div
        className={`${styles("table-row-wrapper")} ${styles("header-wrapper")}`}
      >
        {Object.values(header).map((headerItem, index) => {
          return (
            <div
              data-th={headerItem}
              key={"table-header-item" + index}
              className={`${styles("table-item")} ${styles(
                "table-header-item"
              )}`}
              style={styleRef.current}
            >
              {headerItem}
            </div>
          );
        })}
        {hasActions && (
          <div
            data-th={"פעולות"}
            className={`${styles("table-item")} ${styles("table-header-item")}`}
            style={styleRef.current}
          >
            פעולות
          </div>
        )}
      </div>
      <div className={styles("body-wrapper")}>
        {data.map((dataItem, index) => {
          return (
            <div
              key={"table-row-item" + index}
              className={`${styles("table-row-wrapper")} ${styles(
                "table-row-body-wrapper"
              )}`}
            >
              {Object.keys(header).map((key, itemIndex) => {
                const item = dataItem[key];
                return (
                  <div
                    style={styleRef.current}
                    data-th={header[key]}
                    key={`table-body-item-${index}${itemIndex}`}
                    className={`${styles("table-item")} ${styles(
                      "table-body-item"
                    )}`}
                  >
                    {RenderTableBodyItem(item, dataItem)}
                  </div>
                );
              })}
              {hasActions && (
                <div
                  style={styleRef.current}
                  data-th={"פעולות"}
                  className={`${styles("table-item")} ${styles(
                    "table-body-item"
                  )}`}
                >
                  {Object.values(actions).map((action, idx) => (
                    <button
                      onClick={action.onClick.bind(
                        this,
                        dataItem[action.onKey]
                      )}
                      key={`table-row-${index}-action-${idx}`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TableCreator;

function RenderTableBodyItem(item, data) {
  if (typeof item === "function") {
    return item(data);
  }

  return item;
}
