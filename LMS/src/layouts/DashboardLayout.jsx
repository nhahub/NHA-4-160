// src/layouts/DashboardLayout.jsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="tb-dashboard-shell d-flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="d-flex flex-column flex-grow-1 min-w-0">
        <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-grow-1 p-3 p-sm-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}