import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const getActiveItem = () => {
    if (location.pathname === "/") return "Dashboard";
    if (location.pathname === "/estimation") return "Estimation";
    if (location.pathname === "/portfolio") return "Portfolio";
    if (location.pathname === "/documents") return "Documentation";
    if (location.pathname === "/profile") return "Profile";
    if (location.pathname === "/help") return "Help";
    return "Dashboard";
  };

  return (
    <div className="min-h-screen  text-[#111827]">
      <div className="flex">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeItem={getActiveItem()}
        />

        <div className="min-w-0 flex-1">
          <Header setSidebarOpen={setSidebarOpen} />

          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <div className="max-w-full">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;