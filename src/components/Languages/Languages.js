import Api from "api/requests";
import CmsButton from "components/CmsButton/CmsButton";
import React, { useState } from "react";
import { useSelector } from "react-redux";

import styles from "./Languages.module.scss";

export default function Languages(props) {
  const { form, onChangeForm, setForm } = props;
  const languages = useSelector((store) => store.init?.language);

  function addNewLanguage() {
    function onSuccess(data) {
      const newState = { ...form };
      newState.langId = "";
      newState.langName = "";
      setForm(newState);
    }
    const payload = { lang_id: form.langId, lang: form.langName };
    Api.addNewLanguage({ payload, onSuccess });
  }

  return (
    <div className={styles["cms-languages-wrapper"]}>
      <h3 className={styles["general-info-title language-title"]}>שפות</h3>
      <div className={styles["languages-header-titles"]}>
        <span className={styles["header-title"]}>מזהה</span>
        <span className={styles["header-title"]}>ערך</span>
        <span className={styles["header-title"]}>פעולות</span>
      </div>

      <div className={styles["new-language-row"]}>
        <div className={styles["input-wrapper"]}>
          <input
            className={styles["input"]}
            name={"langId"}
            value={form.langId}
            onChange={onChangeForm}
          />
        </div>
        <div className={styles["input-wrapper"]}>
          <input
            className={styles["input"]}
            name={"langName"}
            value={form.langName}
            onChange={onChangeForm}
          />
        </div>
        <div className={styles["button-wrapper"]}>
          <CmsButton
            title={"הוסף"}
            className="create"
            onClick={addNewLanguage}
            extraStyles={styles}
          />
        </div>
      </div>
      {languages &&
        languages.map((languageData, index) => {
          return <LanguageRow language={languageData} key={"lang-" + index} />;
        })}
    </div>
  );
}

function LanguageRow(props) {
  const { language } = props;

  const [currentValue, setCurrentValue] = useState(language.value.lang);

  function onChange(e) {
    const value = e.target.value;
    setCurrentValue(value);
  }

  function updateLanguage() {
    const payload = {
      id: language._id,
      lang: currentValue,
      lang_id: language.value.id,
    };

    Api.updateLanguage({ payload });
  }

  function deleteLanguage() {
    const payload = { id: language._id };

    Api.deleteLanguage({ payload });
  }

  return (
    <div className={styles["language-row-wrapper"]}>
      <span className={styles["language-id"]}>{language.value.id}</span>

      <div className={styles["input-wrapper"]}>
        <input
          className={styles["input"]}
          value={currentValue}
          onChange={onChange}
        />
      </div>
      <div className={styles["buttons-wrapper"]}>
        <CmsButton
          title={"עדכן"}
          className="update"
          onClick={updateLanguage}
          extraStyles={styles}
        />
        <CmsButton
          title={"מחק"}
          className="delete"
          onClick={deleteLanguage}
          extraStyles={styles}
        />
      </div>
    </div>
  );
}
