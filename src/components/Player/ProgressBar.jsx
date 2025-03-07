import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ProgressBar = ({ duration, currentTime, onSeek }) => {
  const handleChange = (value) => {
    onSeek(value);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className="w-full md:mt-0 mt-2">
      <Slider
        min={0}
        max={duration}
        value={currentTime}
        onChange={handleChange}
        trackStyle={{ backgroundColor: "red", height: "4px" }}
        railStyle={{ backgroundColor: "gray", height: "4px" }}
        handleStyle={{
          backgroundColor: "red",
          border: "1px solid red",
          width: "4px",
          height: "4px",
          marginLeft: "1px",
          marginTop: "0px",
          borderRadius: "100%",
          boxShadow: "none",
          zIndex: "-10",
        }}
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
