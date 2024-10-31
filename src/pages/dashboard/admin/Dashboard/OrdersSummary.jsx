import React from "react";

const OrdersSummary = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">Orders Summary</h3>
      <p>Total Orders: 1500</p>
      <p>Pending Orders: 200</p>
      <p>Delivered Orders: 1200</p>
      <p>Cancelled Orders: 100</p>
    </div>
  );
};

export default OrdersSummary;
