import { useEffect, useState } from "react";
import styles from "./clock.module.scss";
import classNames from "classnames/bind";
import moment from "moment";
const cx = classNames.bind(styles);

export default function Clock() {
  const [time, setTime] = useState<string>(moment().format("h:mm"));
  const [second, setSecond] = useState<string>(moment().format("ss"));

  const updater = () => {
    const curTime = moment().format("h:mm");
    const curSecond = moment().format("ss");
    if (curTime !== time) setTime(curTime);
    if (curSecond !== second) setSecond(curSecond);
  };
  useEffect(() => {
    const timer = setInterval(updater, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <div className={cx("clock-container")}>
      <div className={cx("time-area")}>
        <div className={cx("time")}>{time}</div>
        <div className={cx("second")}>:{second}</div>
      </div>
    </div>
  );
}
