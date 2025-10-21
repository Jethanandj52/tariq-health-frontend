import React from "react";
import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
import DashboardNav from "./DashboardNav";
import Sidebar from "./SideBar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* ✅ Sidebar */}
      <Sidebar />

      {/* ✅ Main Content Area with left margin */}
      <div className="ml-64 flex flex-col min-h-screen">
        <DashboardNav />
        <main className="flex-1 mt-20 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
