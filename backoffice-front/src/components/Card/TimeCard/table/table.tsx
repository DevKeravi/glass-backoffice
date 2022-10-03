import styles from "./table.module.scss";
import classNames from "classnames/bind";
import { WorkingTimeData } from "../timeCard";
import Window from "../../../Common/Window/window";
const cx = classNames.bind(styles);

type TableProps = {
  list: Array<WorkingTimeData>;
  loading: boolean;
};
export default function Table({ list, loading }: TableProps) {
  return (
    <>
      <div className={cx("holder", loading && "active")}></div>
      <div className={cx("holder", loading && "active")}></div>
      <Window>
        {!loading ? (
          <div className={cx("table-container")}>
            <div className={cx("table-row")}>
              <div>날짜</div>
              <div>출근</div>
              <div>퇴근</div>
              <div>휴식</div>
            </div>
            {list.map((row, idx) => (
              <div key={`${row.date} ${idx}`} className={cx("table-row")}>
                <div>{!row.date ? "-" : row.date}</div>
                <div>{!row.start ? "-" : row.start}</div>
                <div>{!row.end ? "-" : row.end}</div>
                <div>{!row.rest ? "-" : row.rest}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className={cx("table-container")}>
            {[0, 1, 2, 3, 4, 5].map((row, idx) => (
              <div key={`${row} ${idx}`} className={cx("table-row")}></div>
            ))}
          </div>
        )}
      </Window>
    </>
  );
}
