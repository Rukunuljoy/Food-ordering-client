import React from "react";

const Progress = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Order Progress</h3>
      <div className="mt-4">
        <p>Orders Delivered</p>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-green-500 h-4 rounded-full" style={{ width: "80%" }}></div>
        </div>
      </div>
      <div className="mt-4">
        <p>Orders Pending</p>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-yellow-500 h-4 rounded-full" style={{ width: "60%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
