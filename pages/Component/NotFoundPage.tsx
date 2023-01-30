/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable no-empty-pattern */

// libarary
import bind from "classnames/bind";
import { memo } from "react";
import { useTranslation } from "react-i18next";

// types

// component

// styles
import styles from "./NotFoundPage.module.scss";

const cx = bind.bind(styles);

const NotFoundPage = memo(() => {
  const { t } = useTranslation();
  return <h1 className={cx("message")}>{t("page_not_found")}</h1>;
});

export default NotFoundPage;
