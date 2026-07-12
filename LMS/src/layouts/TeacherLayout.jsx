import { Outlet } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useLogout } from "../hooks/useLogout";
import Sidebar from "../components/Sidebar";

const TeacherLayout = () => {
  const { logout, isLoading } = useLogout();

  return (
    <div className="d-flex" style={{ minHeight: "100vh", backgroundColor: "var(--color-grey-50)" }}>
      <Sidebar />

      <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
        {/* Top bar */}
        <div
          className="d-flex justify-content-end align-items-center px-4"
          style={{
            height: "72px",
            borderBottom: "1px solid var(--color-grey-200)",
            backgroundColor: "var(--color-grey-0)",
          }}
        >
          <button
            className="btn btn-sm fw-semibold d-flex align-items-center gap-2"
            onClick={logout}
            disabled={isLoading}
            style={{
              color: "var(--color-grey-600)",
              border: "1px solid var(--color-grey-300)",
              backgroundColor: "transparent",
              padding: "6px 14px",
            }}
          >
            <FaSignOutAlt />
            {isLoading ? "Logging out..." : "Logout"}
          </button>
        </div>

        <main className="p-4" style={{ flexGrow: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;