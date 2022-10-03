import styles from "./window.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export type WindowProps = {
  children: JSX.Element;
};
export default function Window({ children }: WindowProps) {
  return <div className={cx("window-container")}>{children}</div>;
}
