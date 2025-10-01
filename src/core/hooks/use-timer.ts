import { useEffect, useState } from "react";

export const useTimer = (timerKey = "resendEmailTimestamp") => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const savedTimestamp = localStorage.getItem(timerKey);
    if (savedTimestamp) {
      const remainingTime = Math.max(
        60 - Math.floor((Date.now() - parseInt(savedTimestamp, 10)) / 1000),
        0
      );

      if (remainingTime > 0) setTimer(remainingTime);
    }
  }, [timerKey]);

  useEffect(() => {
    if (timer > 0) {
      const timer = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const getTimeLabel = (seconds: number) => {
    return `${formatTime(seconds)} ${seconds >= 60 ? "minutes" : "seconds"}`;
  };

  return {
    getTimeLabel,
    setTimer,
    timer,
  };
};
