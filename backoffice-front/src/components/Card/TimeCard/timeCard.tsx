import Window from "../../Common/Window/window";
import styles from "./timeCard.module.scss";
import classNames from "classnames/bind";
import FinishRate from "./finishRate/finishRate";
import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./table/table";

const cx = classNames.bind(styles);

export type WorkingTimeData = {
  date: string;
  start: string;
  end: string;
  work: string;
  rest: string;
};

export default function TimeCard() {
  const [list, setList] = useState<Array<WorkingTimeData>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [leftMin, setLeftMin] = useState<number>(0);
  const [leftTime, setLeftTime] = useState<string>("00:00");
  const getTimeData = async () => {
    setLoading(true);
    try {
      const resp = await axios.get("http://localhost:5000/crawler/getTime");
      setList(resp.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const pareWorkingTime = () => {
    const hour = leftMin / 60;
    const minute = leftMin % 60;
    let result = "";
    if (hour === 0) {
      result = `${minute}분 남았습니다.`;
    } else if (minute === 0) {
      result = `${hour}시간 남았습니다.`;
    } else {
      result = `${hour}시간 ${minute}분 남았습니다.`;
    }
    setLeftTime(result);
  };
  useEffect(() => {
    pareWorkingTime();
  }, [leftMin]);

  useEffect(() => {
    getTimeData();
  }, []);
  return (
    <Window>
      <div className={cx("time-card-container")}>
        <div
          className={cx("refresh-btn", loading && "loading")}
          onClick={() => getTimeData()}
        >
          <div className={cx("refresh-icon")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              className="humbleicons hi-refresh"
            >
              <path
                xmlns="http://www.w3.org/2000/svg"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 20v-5h-5M4 4v5h5m10.938 2A8.001 8.001 0 005.07 8m-1.008 5a8.001 8.001 0 0014.868 3"
              />
            </svg>
          </div>
        </div>
        <div className={cx("time-card-header", loading && "loading")}>
          <div className={cx("loading-title", loading && "loading")}>
            노동 시간 불러오는 중...
          </div>
          <div
            className={cx(
              "main-title",
              loading && "loading",
              leftTime.length < 13 && "large-text"
            )}
          >
            {leftTime}
          </div>
        </div>
        <div className={cx("time-card-content")}>
          <div>
            <FinishRate
              list={list}
              setLeftTime={(time) => {
                setLeftMin(time);
              }}
            />
          </div>
          <div>
            <Table list={list} loading={loading} />
          </div>
        </div>
      </div>
    </Window>
  );
}
