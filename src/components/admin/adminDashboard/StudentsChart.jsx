const StudentCharts = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm w-full grid grid-cols-1 md:grid-cols-2 gap-4">

      <div className="text-center">
        <div className="w-28 h-28 mx-auto rounded-full border-[10px] border-purple-300 border-t-purple-500 flex items-center justify-center">
          <span className="text-xl font-bold">53%</span>
        </div>
        <p className="text-gray-600 mt-2 text-sm">3,178 (Boys)</p>
      </div>

      <div className="text-center">
        <div className="w-28 h-28 mx-auto rounded-full border-[10px] border-yellow-300 border-t-yellow-500 flex items-center justify-center">
          <span className="text-xl font-bold">47%</span>
        </div>
        <p className="text-gray-600 mt-2 text-sm">2,731 (Girls)</p>
      </div>

    </div>
  );
};

export default StudentCharts;