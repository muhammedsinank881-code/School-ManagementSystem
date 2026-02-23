import React, { useEffect, useRef } from "react";

const EyeAnimation = () => {
  const leftEye = useRef(null);
  const rightEye = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const eyes = [leftEye.current, rightEye.current];

      eyes.forEach((eye) => {
        if (!eye) return;

        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        // Find angle towards mouse cursor
        const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);

        // Move pupil within small boundary
        const pupX = Math.cos(angle) * 6;
        const pupY = Math.sin(angle) * 6;

        const pupil = eye.querySelector(".pupil");
        pupil.style.transform = `translate(${pupX}px, ${pupY}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="flex justify-center items-center flex-col mt-4">
      {/* HEAD */}
      <div className="w-28 h-28 bg-yellow-300 rounded-full flex justify-center items-center gap-4 shadow-lg">
        {/* Left Eye */}
        <div
          ref={leftEye}
          className="eye w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden"
        >
          <div className="pupil w-3 h-3 bg-black rounded-full transition-all duration-75"></div>
        </div>

        {/* Right Eye */}
        <div
          ref={rightEye}
          className="eye w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden"
        >
          <div className="pupil w-3 h-3 bg-black rounded-full transition-all duration-75"></div>
        </div>
      </div>

      {/* BODY */}
      <div className="w-20 h-10 bg-yellow-300 rounded-lg mt-[-10px] shadow-md"></div>
    </div>
  );
};

export default EyeAnimation;