"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api from "api/requests";
import Actions from "redux/actions";

import { useRouter } from "next/navigation";

import styles from "./Media.module.scss";
import AnimatedInput from "components/forms/AnimatedInput";
import { Routes } from "constants/routes";
import CmsButton from "components/CmsButton/CmsButton";
import Switch from "../Switch/Switch";
export default function MediaForm(props) {
  const [currentMedia, setCurrentMedia] = useState(null);
  const [uploadUrl, setUploadUrl] = useState(false);
  const [mediaType, setMediaType] = useState("image");
  const [alt, setAlt] = useState("");
  const [name, setName] = useState("");
  const [base64, setBase64] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  function onMediaChange(e) {
    const fileList = e.target.files;
    let file = null;
    for (let i = 0; i < fileList.length; i++) {
      if (
        fileList[i].type.match(/^image\//) ||
        fileList[i].type.match(/^video\//)
      ) {
        file = fileList[i];
        break;
      }
    }
    if (file !== null) {
      const url = URL.createObjectURL(file);
      getBase64(file, (result) => {
        setBase64(result);
      });
      setMediaType(file.type.split("/")[0]);
      setCurrentMedia(url);
    }
  }

  function onUrlChange(e) {
    const { value } = e.target;
    setUrl(value);
    setCurrentMedia(value);
  }

  function onBlurUrl() {
    if (url.startsWith("https://www.youtube.com")) {
      const paramsString = url.split("?")?.[1];
      const searchParams = new URLSearchParams(paramsString);
      setCurrentMedia(`https://www.youtube.com/embed/${searchParams.get("v")}`);
    }
  }

  function showUrl() {
    return (
      <div className={styles["url-wrapper"]}>
        <AnimatedInput
          placeholder="קישור למדיה"
          className={["input-wrapper"]}
          value={url}
          name="url"
          onChange={onUrlChange}
          type="text"
          extraStyles={styles}
          onBlur={onBlurUrl}
        />

        <div className={styles["switch-wrapper"]}>
          <div>תמונה</div>
          <Switch
            className={styles["switch"]}
            state={mediaType === "video"}
            onClick={() =>
              setMediaType((prev) => (prev === "video" ? "image" : "video"))
            }
          />
          <div>סרטון</div>
        </div>
      </div>
    );
  }

  function showMedia() {
    if (currentMedia) {
      switch (mediaType) {
        case "image":
          return <img className={styles["media"]} src={currentMedia} />;
        case "video":
          if (base64) {
            return <video className={styles["media"]} src={currentMedia} />;
          } else {
            <iframe className={styles["media"]} src={currentMedia} />;
          }
      }
    } else {
      return (
        <>
          <input
            id="media-file"
            className={styles["media-file"]}
            type="file"
            accept="image/heic, image/*, video/*"
            onChange={onMediaChange}
          />
          <label htmlFor="media-file" className={styles["media-file-label"]}>
            {"נא לבחור מדיה"}
          </label>
        </>
      );
    }
  }

  function onAltTextChange(event) {
    const { value } = event.target;

    setAlt(value);
  }

  function onNameChange(event) {
    const { value } = event.target;

    setName(value);
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
    dispatch(Actions.addMedia(data));
    router.push(Routes.cmsMedia);
  }
  function addMedia() {
    const payload = {
      alt: alt,
      name: name,
      type: mediaType,
    };
    if (base64) {
      payload.photobase64 = base64;
    } else if (url) {
      payload.url = url;
    }
    Api.addMedia({ payload, onSuccess });
  }

  function removeMedia() {
    setCurrentMedia();
  }

  function onUploadUrlChange() {
    setUploadUrl((prev) => {
      if (prev) {
        setUrl("");
      } else {
        setBase64("");
      }
      setCurrentMedia();
      return !prev;
    });
  }

  return (
    <div className={styles["media-container"]}>
      <div className={styles["switch-wrapper"]}>
        <div>העלאת מדיה</div>
        <Switch
          className={styles["switch"]}
          state={uploadUrl}
          onClick={onUploadUrlChange}
        />
        <div>מדיה מקישור</div>
      </div>
      <div className={styles["media-chooser"]}>
        {uploadUrl ? showUrl() : showMedia()}
      </div>

      <AnimatedInput
        placeholder="שם"
        className={["input-wrapper"]}
        value={name}
        name="name"
        onChange={onNameChange}
        type="text"
        extraStyles={styles}
      />

      <AnimatedInput
        placeholder="טקסט חלופי"
        className={["input-wrapper"]}
        value={alt}
        name="alt"
        onChange={onAltTextChange}
        type="text"
        extraStyles={styles}
      />

      <CmsButton
        title={"הוסף"}
        onClick={addMedia}
        className={"create"}
        isDisabled={!currentMedia}
        extraStyles={styles}
      />
      {currentMedia && (
        <CmsButton
          title={"הסר מדיה"}
          onClick={removeMedia}
          className={"delete"}
          extraStyles={styles}
        />
      )}
    </div>
  );
}
