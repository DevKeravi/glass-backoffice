import styles from "./header.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import moment from "moment";
const cx = classNames.bind(styles);

const welcomeMsg: Array<string> = [
  "오늘 하루는 어떠셨나요?",
  "점심으로는 어떤걸 드실껀가요?",
  "피곤하시면 자세를 고쳐 앉아보세요",
];

const 요일변환 = (value: number) => {
  let result = "월";
  switch (value) {
    case 1:
      result = "월";
      break;
    case 2:
      result = "화";
      break;
    case 3:
      result = "수";
      break;
    case 4:
      result = "목";
      break;
    case 5:
      result = "금";
      break;
    case 6:
      result = "토";
      break;
    case 0:
      result = "일";
      break;
  }
  return result;
};
export default function Header() {
  const [dropToggle, setDropToggle] = useState<boolean>(false);
  const [welcome, setWelcome] = useState<number>(0);
  const [date, setDate] = useState<string>(
    `${moment().format("YY-MM-DD")} (${요일변환(moment().day())}) `
  );

  const changeWelcomeMsg = () => {
    if (welcome + 1 < welcomeMsg.length) {
      setWelcome(welcome + 1);
    } else {
      setWelcome(0);
    }
  };

  useEffect(() => {
    const welcomeFunction = setInterval(changeWelcomeMsg, 10000);
    return () => clearInterval(welcomeFunction);
  }, []);

  return (
    <div className={cx("header-container")}>
      <div className={cx("left-side")}>
        <div
          className={cx("drop-down-icon")}
          onClick={(e) => setDropToggle(!dropToggle)}
        >
          <div className={cx("first-line", dropToggle && "active")}></div>
          <div className={cx("second-line", dropToggle && "active")}></div>
        </div>
        <div className={cx("welcome-msg")}>
          &#128512; 안녕하세요. demian님 {welcomeMsg[welcome]}
        </div>
      </div>
      <div className={cx("right-side")}>
        <div className={cx("date-container")}>{date}</div>
      </div>
    </div>
  );
}
