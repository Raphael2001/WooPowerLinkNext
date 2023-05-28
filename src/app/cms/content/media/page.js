"use client";
import React, {useState} from "react";
import { useSelector } from "react-redux";

import Api from "api/requests";
import Link from "next/link";

import styles from "./media.module.scss";
import CmsButton from "components/CmsButton/CmsButton";
import { Routes } from "constants/routes";
import TrashBin from 'assets/icons/remove.svg';
import {combineClassNames} from "../../../../utils/functions";
import CmsInput from "../../../../components/forms/CmsInput/CmsInput";
import SmartMedia, {MediaTypes} from "../../../../components/SmartMedia/SmartMedia";
export default function MediaPage() {
  const medias = useSelector((store) => store.init?.media);
  const [query, setQuery] = useState('');

  const onQueryChange = e => {
      const { value } = e.target;
      setQuery(value);
  };


  const getMediasByQuery = () => {
      const allMedias = {};
      Object.keys(medias).forEach(img => {
         if(medias[img].name.toLowerCase().includes(query.toLowerCase())) {
             allMedias[img] = medias[img];
         }
      });
      return allMedias;
  };

  return (
    <div className={styles["all-media"]}>
        <CmsInput
            placeholder={'חפש מדיה'}
            value={query}
            onChange={onQueryChange}
            className={styles['search-box']}
        />
        <div className={styles['medias-container']}>
        {medias && Object.keys(getMediasByQuery()).map((media, idx) => {
            return (
                <MediaBox
                    key={`media-${media}-${idx}`}
                    {...medias[media]}
                    id={media}
                />
            );
        })}
        </div>
    </div>
  );
}

function MediaBox(props) {
    const { id, name, className } = props;

    const onRemoveClick = () => {
        const props = {
            payload: {
                id
            }
        }
        Api.removeMedia(props);
    };

    return (
        <div className={combineClassNames(
            styles['media-container'],
            className
        )}>
            <SmartMedia className={styles['media']} item={props}/>
            <div className={styles['media-container-footer']}>
                <div className={styles['media-name']}>{name}</div>
                <button className={styles['media-delete']} onClick={onRemoveClick}>
                    <img src={TrashBin.src} alt={'remove media'} />
                </button>
            </div>
        </div>
    )
}