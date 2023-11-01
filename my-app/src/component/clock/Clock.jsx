// import React, { useState, useEffect } from "react";
// import "./Clock.css";
// import { useSelector } from "react-redux";
// const Clock = ({ isRunning }) => {
//   const [startTime, setStartTime] = useState(new Date());
//   const [pausedTime, setPausedTime] = useState(null);
//   const [timeData, setTimeData] = useState("");

//   const getTimesData = useSelector(
//     (state) => state && state?.time && state?.time?.timeData
//   );
//   useEffect(() => {
//     if (getTimesData) {
//       setTimeData(getTimesData?.datetime);
//     }
//   }, [getTimesData]);

//   useEffect(() => {
//     let interval;

//     if (isRunning) {
//       setStartTime(new Date());

//       interval = setInterval(() => {
//         setStartTime(
//           (prevStartTime) => new Date(prevStartTime.getTime() + 1000)
//         );
//       }, 1000);
//     } else {
//       clearInterval(interval);
//       setPausedTime(new Date());
//     }

//     return () => {
//       clearInterval(interval);
//     };
//   }, [isRunning]);

//   const formatTime = (time) => {
//     if (!time) return "00:00:00";

//     const hours = time.getHours();
//     const minutes = time.getMinutes();
//     const seconds = time.getSeconds();

//     return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
//       2,
//       "0"
//     )}:${String(seconds).padStart(2, "0")}`;
//   };

//   return (
//     <div className="clock-container">
//       <div className="clock-display">
//         <p>{formatTime(isRunning ? startTime : pausedTime)}</p>
//       </div>
//     </div>
//   );
// };

// export default Clock;

import React, { useState, useEffect } from "react";
import "./Clock.css";
import { useSelector } from "react-redux";

const Clock = ({ isRunning }) => {
  const [startTime, setStartTime] = useState(new Date());
  const [pausedTime, setPausedTime] = useState(null);
  const [timeData, setTimeData] = useState(null);

  const getTimesData = useSelector((state) => state?.time?.timeData);

  useEffect(() => {
    if (getTimesData) {
      const apiTime = new Date(getTimesData);
      if (!isNaN(apiTime)) {
        setTimeData(apiTime);
      }
    }
  }, [getTimesData]);

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
      <div className="clock-display">
        <p>{formatTime(timeData || (isRunning ? startTime : pausedTime))}</p>
      </div>
    </div>
  );
};

export default Clock;
