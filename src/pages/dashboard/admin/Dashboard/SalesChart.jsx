import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales",
      data: [1200, 1900, 3000, 5000, 2400, 3200],
      fill: false,
      backgroundColor: "rgb(34, 197, 94)",
      borderColor: "rgba(34, 197, 94, 0.2)",
    },
  ],
};

const SalesChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md col-span-2">
      <h3 className="text-lg font-semibold">Sales Overview</h3>
      <Line data={data} />
    </div>
  );
};

export default SalesChart;
