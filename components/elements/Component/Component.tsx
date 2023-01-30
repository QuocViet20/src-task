/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/button-has-type */
/* eslint-disable no-empty-pattern */

// libarary
import bind from "classnames/bind";
import { memo } from "react";

// types

// component

// styles
import styles from "./Component.module.scss";

const cx = bind.bind(styles);

const Component = memo(() => {
  return <div className={cx("component")} />;
});

export default Component;
