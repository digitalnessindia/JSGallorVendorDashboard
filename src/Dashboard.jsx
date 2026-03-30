import React from "react";
import WelcomeSection from "./VendorDashboard/Dashboard/WelcomeSection";
import MetricsCards from "./VendorDashboard/Dashboard/MetricsCards";
import ProjectsSection from "./VendorDashboard/Dashboard/ProjectsSection";
import RevenueSection from "./VendorDashboard/Dashboard/RevenueSection";
import RecentOrders from "./VendorDashboard/Dashboard/RecentOrders";
import RecentActivity from "./VendorDashboard/Dashboard/RecentActivity";

const Dashboard = () => {
  return (
    
    <div className="space-y-6">
      <WelcomeSection />
      <MetricsCards />
      <ProjectsSection />
      <RevenueSection />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.25fr_0.9fr]">
        <RecentOrders />
        <RecentActivity />
      </div>
    </div>
  );
};

export default Dashboard;