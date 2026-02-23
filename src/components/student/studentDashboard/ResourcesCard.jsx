import React from "react";
import { FiBook } from "react-icons/fi";
import { LuVideo } from "react-icons/lu";
import { PiNewspaper } from "react-icons/pi";

const ResourcesCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Resources</h2>
      </div>

      {/* Resource items */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center bg-[#f8f3ea] rounded-xl p-4">
          <FiBook className="text-2xl text-gray-700" />
          <p className="text-sm mt-2">Books</p>
        </div>

        <div className="flex flex-col items-center bg-[#eaf9f8] rounded-xl p-4">
          <LuVideo className="text-2xl text-gray-700" />
          <p className="text-sm mt-2">Videos</p>
        </div>

        <div className="flex flex-col items-center bg-[#f3eefc] rounded-xl p-4">
          <PiNewspaper className="text-2xl text-gray-700" />
          <p className="text-sm mt-2">Papers</p>
        </div>
      </div>
    </div>
  );
};

export default ResourcesCard;