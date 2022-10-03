import styles from "./index.module.scss";
import classNames from "classnames/bind";
import TimeCard from "../../components/Card/TimeCard/timeCard";
import Clock from "../../components/Clock/clock";
import GmailCard from "../../components/Card/GmailCard/gmailCard";
import TodoCard from "../../components/Card/TodoCard/todoCard";
import Header from "../../components/Common/Header/header";
import { useEffect, useRef } from "react";

const cx = classNames.bind(styles);
export default function IndexPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const setVideoSpd = () => {};
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2;
    }
  }, []);
  return (
    <div className={cx("page-container")}>
      <Header />
      <div className={cx("video-background")}>
        <video
          ref={videoRef}
          src="/assets/background/video-bg.mp4"
          autoPlay
          loop
          muted
        ></video>
      </div>
      <div className={cx("header-container")}>
        <Clock />
      </div>
      <div className={cx("content-container")}>
        <TodoCard />
        <TimeCard />
        <GmailCard />
      </div>
    </div>
  );
}
