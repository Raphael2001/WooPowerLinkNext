"use client";

import { useDispatch, useSelector } from "react-redux";

import styles from "./main.module.scss";
import { Autocomplete, TextField } from "@mui/material";

import TableCreator from "components/TableCreator/TableCreator";
import { useEffect, useState } from "react";
import Actions from "redux/actions";
import CmsButton from "components/CmsButton/CmsButton";
import Api from "api/requests";
import NotificationsTypes from "constants/NotificationsTypes";

export default function Main() {
  const [data, setData] = useState([]);

  const itemsForm = useSelector((store) => store.itemsForm);
  const dispatch = useDispatch();
  const items = useSelector((store) => store.init.items);

  const woocommerceShippingMethods = useSelector(
    (store) => store.init.woocommerce_shipping_methods
  );

  useEffect(() => {
    dispatch(Actions.setItemsForm(items));
  }, [items]);

  useEffect(() => {
    const tableContent = [];
    if (woocommerceShippingMethods) {
      for (const key in woocommerceShippingMethods) {
        const shippingMethod = woocommerceShippingMethods[key];
        const product = {
          wooProduct: shippingMethod.title,
          powerLinkProduct: renderPowerLinkAutoComplete,
          quantity: renderQuantityInput,
          wooId: shippingMethod.id,
        };
        tableContent.push(product);
      }
    }
    setData(tableContent);
  }, [woocommerceShippingMethods]);

  const header = {
    wooProduct: "WOOCOMMERCE שם מוצר",
    powerLinkProduct: "POWERLINK שם מוצר",
    quantity: "כמות",
  };

  function renderPowerLinkAutoComplete(data) {
    return <PowerLinkItemsInput id={data.wooId} />;
  }

  const renderQuantityInput = (data) => {
    return <RenderQuantityInput id={data.wooId} />;
  };

  function onSubmit() {
    const items = Object.values(itemsForm);
    Api.upsertItems({ payload: { items }, onSuccess });
    function onSuccess() {
      dispatch(
        Actions.addNotification({
          type: NotificationsTypes.SUCCCESS,
          payload: { title: "עודכן בהצלחה", text: "המידע עודכן בהצלחה" },
        })
      );
    }
  }

  return (
    <div className={styles["main-container"]}>
      <TableCreator header={header} data={data} />

      <div className={styles["button"]}>
        <CmsButton className="update" title={"עדכון"} onClick={onSubmit} />
      </div>
    </div>
  );
}

function PowerLinkItemsInput(props) {
  const powerLinkProducts = useSelector(
    (store) => store.init.powerlink_products
  );
  const dispatch = useDispatch();
  const itemsForm = useSelector((store) => store.itemsForm);

  const { id } = props;

  if (!powerLinkProducts) {
    return <></>;
  }

  function onChangeHanlder(e, products) {
    const productsIds = [];
    for (const key in products) {
      const product = products[key];

      productsIds.push(product.productid);
    }

    dispatch(
      Actions.setItemIds({
        wooId: id,
        powerLinkIds: productsIds,
      })
    );
  }

  let value = [];
  if (itemsForm[id]?.powerLinkIds) {
    for (const key in itemsForm[id].powerLinkIds) {
      const productId = itemsForm[id].powerLinkIds[key];
      const product = powerLinkProducts.find(
        (item) => item.productid === productId
      );
      value.push(product);
    }
  }

  return (
    <div className={styles["powerlink-products-autocomplete"]}>
      <Autocomplete
        value={value}
        multiple
        options={powerLinkProducts}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => (
          <TextField {...params} variant="standard" placeholder="מוצרים" />
        )}
        onChange={onChangeHanlder}
      />
    </div>
  );
}

function RenderQuantityInput(props) {
  const { id } = props;
  const itemsForm = useSelector((store) => store.itemsForm);
  const dispatch = useDispatch();

  function onChangeInput(e) {
    const { value, id } = e.target;
    dispatch(
      Actions.setItemQuantity({
        wooId: id,
        quantity: value,
      })
    );
  }

  return (
    <TextField
      variant="standard"
      placeholder="כמות"
      id={id}
      onChange={onChangeInput}
      value={itemsForm[id]?.quantity}
    />
  );
}
