import { Outlet, NavLink, Navigate } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useTeacherProfile } from "../hooks/useTeacherProfile";

const SuperAdminLayout = () => {
  const { logout, isLoading: isLoggingOut } = useLogout();
  const { data: profile, isLoading: isProfileLoading } = useTeacherProfile();

  if (isProfileLoading) {
    return (
      <div style={{ color: "var(--color-grey-900)", padding: "20px" }}>
        Loading...
      </div>
    );
  }

  if (!profile || profile.role !== "super-admin") {
    return <Navigate to="/login" replace />;
  }

  const navLinkStyle = ({ isActive }) => ({
    display: "block",
    padding: "12px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    color: isActive ? "var(--color-blue-text)" : "var(--color-grey-700)",
    backgroundColor: isActive ? "var(--color-brand-600)" : "transparent",
    marginBottom: "10px",
    transition: "all 0.2s ease",
  });

  return (
    <div
      className="d-flex vh-100"
      style={{ backgroundColor: "var(--color-grey-50)" }}
    >
      <nav
        className="d-flex flex-column p-4"
        style={{
          width: "250px",
          backgroundColor: "var(--color-grey-0)",
          borderRight: "1px solid var(--color-grey-200)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <h3 className="fw-bold mb-5" style={{ color: "var(--color-grey-900)" }}>
          Super Admin
        </h3>

        <div className="flex-grow-1">
          <NavLink to="/super-admin" end style={navLinkStyle}>
            Dashboard
          </NavLink>
          <NavLink to="/super-admin/tenants" style={navLinkStyle}>
            Academies
          </NavLink>
          <NavLink to="/super-admin/settings" style={navLinkStyle}>
            Settings
          </NavLink>
        </div>

        <button
          onClick={logout}
          disabled={isLoggingOut}
          className="btn fw-bold w-100 mt-auto"
          style={{
            backgroundColor: "var(--color-grey-200)",
            color: "var(--color-grey-800)",
            border: "1px solid var(--color-grey-300)",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          {isLoggingOut ? "Logging out..." : "Log Out"}
        </button>
      </nav>

      <main className="flex-grow-1 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default SuperAdminLayout;
