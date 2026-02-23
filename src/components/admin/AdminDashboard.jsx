import React from "react";
import WelcomeCard from "./adminDashboard/WelcomCard";
import StudentCharts from "./adminDashboard/StudentsChart";
import NoticeBoard from "./adminDashboard/NoticeBoard";
import StatsCards from "./adminDashboard/StatsCard";
import CalendarCard from "./adminDashboard/CalendarCard ";
import EyeAnimation from "./adminDashboard/EyeAnimation ";
import AnalogClock from "./adminDashboard/AnalogClock";

const AdminDashboard = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen space-y-6 ">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">

        {/* LEFT SECTION */}
        <div className=" lg:col-span-8 flex flex-col gap-6">
          <WelcomeCard />

          {/* Charts + Eye + Clock */}
          <div className="
            flex 
            flex-col md:flex-row 
            md:items-center 
            md:justify-between 
          ">
            <div className="w-1/3 hidden md:flex">
              <StudentCharts />
            </div>

            <div className="w-full md:w-2/3 flex gap-5 justify-between">
              <div className="w-1/2  md:w-full flex justify-center">
                <EyeAnimation />
              </div>

              <div className="w-1/2 md:w-full flex justify-center ">
                <div className="scale-75 sm:scale-90 md:scale-100">
                  <AnalogClock />
                </div>
              </div>
            </div>
          </div>

          {/* Notice Board */}
          <NoticeBoard />
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:col-span-4 flex flex-col gap-6">

          <div className="flex w-full justify-between">
            <StatsCards />
            <div className="flex md:hidden">
              <StudentCharts />
            </div>
          </div>

          <CalendarCard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;