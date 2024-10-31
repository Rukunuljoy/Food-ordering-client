import React from "react";
import Progress from "./Dashboard/Progress";
import SalesChart from "./Dashboard/SalesChart";
import DistributionChart from "./Dashboard/DistributionChart";
import OrdersSummary from "./Dashboard/OrdersSummary";

const Dashboard = () => {
  return <main className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <Progress />
  <SalesChart />
  <DistributionChart />
  <OrdersSummary />
</main>
};

export default Dashboard;

