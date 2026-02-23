import React from "react";
import Welcome from '../../../assets/students/welcome.svg'

const WelcomeCard = () => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-md p-6 flex items-center justify-between">
      
      {/* LEFT TEXT */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Hey Ashwin.</h1>
        <p className="text-gray-600 w-[320px] leading-relaxed">
          Welcome back! We're here to support you on your learning journey.
          Dive into your classes and keep progressing towards your goals.
        </p>
      </div>

      {/* RIGHT IMAGE */}
      <img 
        src={Welcome}
        alt="illustration"
        className="w-30 md:w-55 h-auto object-contain"
      />

    </div>
  );
};

export default WelcomeCard;