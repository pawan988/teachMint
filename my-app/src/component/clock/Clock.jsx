import React, { useState, useEffect } from "react";
import "./Clock.css";

const Clock = () => {
  const [startTime, setStartTime] = useState(new Date());
  const [pausedTime, setPausedTime] = useState(null);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval;

    if (isRunning) {
      setStartTime(new Date());

      interval = setInterval(() => {
        setStartTime(
          (prevStartTime) => new Date(prevStartTime.getTime() + 1000)
        );
      }, 1000);
    } else {
      clearInterval(interval);
      setPausedTime(new Date());
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const formatTime = (time) => {
    if (!time) return "00:00:00";

    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="clock-container">
      <h1 className="clock-title">Digital Clock</h1>
      <div className="clock-display">
        <p>{formatTime(isRunning ? startTime : pausedTime)}</p>
      </div>
      <div className="clock-buttons">
        <button className="clock-button" onClick={handleStart}>
          Start
        </button>
        <button className="clock-button" onClick={handlePause}>
          Pause
        </button>
      </div>
    </div>
  );
};

export default Clock;
