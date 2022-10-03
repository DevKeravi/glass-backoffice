import Window from "../../Common/Window/window";
import styles from "./gmailCard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function GmailCard() {
  return (
    <Window>
      <div className={cx("gmail-card-container")}>
        <div className={cx("gmail-card-header")}>Gmail</div>
        <div className={cx("gmail-card-content")}></div>
      </div>
    </Window>
  );
}
