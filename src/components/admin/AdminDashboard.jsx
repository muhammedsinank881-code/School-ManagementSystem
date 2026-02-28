import React from "react";
import WelcomeCard from "./adminDashboard/WelcomCard";
import StudentCharts from "./adminDashboard/StudentsChart";
import NoticeBoard from "./adminDashboard/NoticeBoard";
import StatsCards from "./adminDashboard/StatsCard";
import CalendarCard from "./adminDashboard/CalendarCard ";


const AdminDashboard = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen space-y-6 ">

      {/* TOP GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 ">

        {/* LEFT SECTION */}
        <div className=" lg:col-span-8 flex flex-col gap-6">
          <WelcomeCard />



          <div className="">
    <NoticeBoard />
</div>
        </div>

        {/* RIGHT SECTION */}
        <div className="lg:col-span-4 flex flex-col gap-6">

          <div className="flex w-full justify-between gap-3">
            <StatsCards />
              <StudentCharts />
          </div>

          <CalendarCard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;