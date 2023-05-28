"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "api/requests";
import Actions from "redux/actions";

import { useRouter } from "next/navigation";

import styles from "./Image.module.scss";
import AnimatedInput from "components/forms/AnimatedInput";
import { Routes } from "constants/routes";
import CmsButton from "components/CmsButton/CmsButton";
export default function ImageForm(props) {
  const { isNewImage = false, imageId = 0 } = props;

  const images = useSelector((store) => store.init.images);
  const [currentImage, setCurrentImage] = useState(null);
  const [alt, setAlt] = useState("");
  const [base64, setBase64] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isNewImage && imageId && images) {
      const image = images[Number(imageId)];

      setCurrentImage(image.url);
      setAlt(image.alt);
    }
  }, [isNewImage, imageId, images]);

  function onImageChange(e) {
    const fileList = e.target.files;
    let file = null;
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].type.match(/^image\//)) {
        file = fileList[i];
        break;
      }
    }
    if (file !== null) {
      const url = URL.createObjectURL(file);
      getBase64(file, (result) => {
        setBase64(result);
      });
      setCurrentImage(url);
    }
  }

  function showImage() {
    if (currentImage) {
      return <img className={styles["image"]} src={currentImage} />;
    } else {
      return (
        <div className={styles["image-chooser"]}>
          <input
            id="image-file"
            className={styles["image-file"]}
            type="file"
            accept="image/*"
            onChange={onImageChange}
          />
        </div>
      );
    }
  }

  function onAltTextChange(event) {
    const { value } = event.target;

    setAlt(value);
  }

  function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  function onSuccess(data) {
    dispatch(Actions.addImage(data));
    router.push(Routes.cmsImages);
  }
  function addImage() {
    const payload = { alt: alt, photobase64: base64 };
    if (imageId) {
      payload["imageNo"] = imageId;
    }
    Api.addImage({ payload, onSuccess });
  }

  function removeImage() {
    setCurrentImage();
  }

  return (
    <div className={styles["image-container"]}>
      {showImage()}
      <AnimatedInput
        placeholder="טקסט חלופי"
        className={styles["input-wrapper"]}
        value={alt}
        name="alt"
        onChange={onAltTextChange}
        type="text"
      />

      <CmsButton
        title={isNewImage ? "הוסף" : "עדכן"}
        onClick={addImage}
        className={`${isNewImage ? "create" : "update"}`}
        isDisabled={!currentImage}
        extraStyles={styles}
      />
      {currentImage && (
        <CmsButton
          title={"הסר תמונה"}
          onClick={removeImage}
          className={"delete"}
          extraStyles={styles}
        />
      )}
    </div>
  );
}
