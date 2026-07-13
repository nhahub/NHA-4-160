import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import Sidebar from "../features/AdminDashbourd/Sidebar";
import DashboardNavbar from "../features/AdminDashbourd/DashboardNavbar";

const TeacherLayout = () => {
  const { logout, isLoading } = useLogout();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="tb-dashboard-shell d-flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="d-flex flex-column flex-grow-1 min-w-0">
        <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} />

        <div className="p-3 d-flex justify-content-end border-bottom tb-border">
          <button
            className="btn btn-outline-danger"
            onClick={logout}
            disabled={isLoading}
          >
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>

        <main className="flex-grow-1 p-3 p-sm-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;