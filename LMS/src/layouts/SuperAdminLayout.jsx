import { Outlet } from "react-router-dom";
import { FaMoon, FaSun, FaSignOutAlt } from "react-icons/fa";
import { useLogout } from "../hooks/useLogout";
import SuperAdminSidebar from "../components/SuperAdminSidebar";
import { useTheme } from "../hooks/useTheme";

const SuperAdminLayout = () => {
  const { logout, isLoading } = useLogout("/");
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="d-flex"
      style={{ minHeight: "100vh", backgroundColor: "var(--color-grey-50)" }}
    >
      <SuperAdminSidebar />

      <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
        <div
          className="d-flex justify-content-end align-items-center px-4"
          style={{
            height: "72px",
            borderBottom: "1px solid var(--color-grey-200)",
            backgroundColor: "var(--color-grey-0)",
          }}
        >
          <div className="d-flex align-items-center gap-3">
            <button
              onClick={toggleTheme}
              className="btn border-0 d-flex align-items-center justify-content-center"
              style={{ color: "var(--color-grey-600)" }}
              title="Toggle Theme"
            >
              {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

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
              <FaSignOutAlt size={16} />
              {isLoading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>

        <main className="p-4" style={{ flexGrow: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
