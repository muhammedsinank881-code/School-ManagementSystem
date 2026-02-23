import React, { useEffect, useState } from "react";

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6;
  const hourDeg = hours * 30 + minutes * 0.5;

  return (
    <div className="flex justify-center items-center p-4">
      <div className="w-44 h-44 bg-white rounded-full shadow-lg border-4 border-yellow-500 relative">

        {/* Center Dot */}
        <div className="w-4 h-4 bg-purple-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50" />

        {/* Hour Hand */}
        <div
          className="w-2 h-16 bg-purple-500 absolute top-1/2 left-1/2 origin-bottom rounded-full"
          style={{ transform: `translate(-50%, -100%) rotate(${hourDeg}deg)` }}
        />

        {/* Minute Hand */}
        <div
          className="w-1.5 h-20 bg-yellow-500 absolute top-1/2 left-1/2 origin-bottom rounded-full"
          style={{ transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)` }}
        />

        {/* Second Hand */}
        <div
          className="w-1 h-24 bg-purple-300 absolute top-1/2 left-1/2 origin-bottom rounded-full"
          style={{ transform: `translate(-50%, -100%) rotate(${secondDeg}deg)` }}
        />
      </div>
    </div>
  );
};

export default AnalogClock;