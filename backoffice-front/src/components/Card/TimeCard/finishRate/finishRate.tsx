import styles from "./finishRate.module.scss";
import classNames from "classnames/bind";
import ReactECharts from "echarts-for-react";
import Chart from "echarts";
import { WorkingTimeData } from "../timeCard";
import { useEffect, useState } from "react";
import moment from "moment";

const cx = classNames.bind(styles);
export type FinishRateProps = {
  list: Array<WorkingTimeData>;
  setLeftTime: (time: number) => void;
};

type TimeValue = {
  work: number;
  left: number;
};
const START_TIME = "10:00";
export default function FinishRate({ list, setLeftTime }: FinishRateProps) {
  const [time, setTime] = useState<TimeValue>({ work: 0, left: 40 * 60 });
  const calcListData = () => {
    let totalTime = 40 * 60;
    let workTime = 0;
    list.forEach((v) => {
      if (v.end !== "") {
        const end = v.end.split(":");
        const start = START_TIME.split(":");
        const endHH = parseInt(end[0]);
        const startHH = parseInt(start[0]);
        const endMM = parseInt(end[1]);

        const rest = v.rest === "" ? 0 : v.rest === "01:00" ? 60 : 30;
        const diffHH = endHH - startHH;
        const workMM = diffHH * 60 + endMM - rest;
        totalTime -= workMM;
        workTime += workMM;
      }
    });
    setTime((prev) => ({ left: totalTime, work: workTime }));
    setLeftTime(totalTime);
  };
  const colorPalette = ["#00b04f", "#ffbf00", "#ff0000"];
  const option = {
    title: {
      text: "당신의 노력",
      left: "center",
      top: 0,
      textStyle: {
        color: "#fff",
      },
    },
    tooltip: {
      trigger: "item",
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: [
      {
        name: "How much left",
        type: "pie",
        radius: "55%",
        center: ["50%", "50%"],
        data: [
          {
            value: time.left,
            name: "남은 시간 (분)",
            itemStyle: { color: "#9a60b4" },
          },
          {
            value: time.work,
            name: "일한 시간 (분)",
            itemStyle: { color: "#73c0de" },
          },
        ],
        color: colorPalette,
        roseType: "radius",
        label: {
          color: "rgba(255, 255, 255, 1)",
        },
        labelLine: {
          lineStyle: {
            color: "rgba(255, 255, 255, 0.3)",
          },
          smooth: 0.2,
          length: 10,
          length2: 20,
        },
        itemStyle: {
          color: "#ff6600",
          shadowBlur: 200,
          shadowColor: "rgba(0, 0, 0, 0)",
        },
        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: function (idx: number) {
          return Math.random() * 200;
        },
      },
    ],
    graph: {
      color: colorPalette,
    },
  };
  useEffect(() => {
    calcListData();
  }, [list]);
  return (
    <div className={cx("chart-container")}>
      <ReactECharts option={option} notMerge lazyUpdate></ReactECharts>
    </div>
  );
}
