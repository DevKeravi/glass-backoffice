import Window from "../../Common/Window/window";
import styles from "./todoCard.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function TodoCard() {
  return (
    <Window>
      <div className={cx("todo-card-container")}>
        <div className={cx("todo-card-header")}>금일 업무</div>
        <div className={cx("todo-card-content")}></div>
      </div>
    </Window>
  );
}
