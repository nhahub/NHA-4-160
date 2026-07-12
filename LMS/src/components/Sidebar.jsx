import { NavLink } from "react-router-dom";
import { FaTh, FaBook, FaUserGraduate, FaCog, FaGraduationCap } from "react-icons/fa";
import { useTeacherProfile } from "../hooks/useTeacherProfile";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: <FaTh />, end: true },
  { to: "/dashboard/courses", label: "Courses", icon: <FaBook /> },
  { to: "/dashboard/students", label: "Students", icon: <FaUserGraduate /> },
  { to: "/dashboard/settings", label: "Settings", icon: <FaCog /> },
];

const Sidebar = () => {
  const { data: profile } = useTeacherProfile();

  const initials = (profile?.name || "?")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <aside
      className="d-flex flex-column"
      style={{
        width: "260px",
        minWidth: "260px",
        height: "100vh",
        position: "sticky",
        top: 0,
        backgroundColor: "var(--color-grey-0)",
        borderRight: "1px solid var(--color-grey-200)",
      }}
    >
      {/* Logo */}
      <div className="d-flex align-items-center gap-2 px-4" style={{ height: "72px" }}>
        <FaGraduationCap style={{ color: "var(--color-brand-600)", fontSize: "1.6rem" }} />
        <div>
          <div className="fw-bold" style={{ color: "var(--color-grey-900)", lineHeight: 1.1 }}>
            {profile?.tenants?.academy_name || "TeachBase"}
          </div>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.06em", color: "var(--color-grey-400)" }}>
            TEACHER PORTAL
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="d-flex flex-column gap-1 px-3 mt-2 flex-grow-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className="d-flex align-items-center gap-3 px-3 py-2 rounded-3 text-decoration-none"
            style={({ isActive }) => ({
              color: isActive ? "var(--color-brand-600)" : "var(--color-grey-600)",
              backgroundColor: isActive ? "var(--color-grey-100)" : "transparent",
              fontWeight: isActive ? 600 : 500,
              borderLeft: isActive
                ? "3px solid var(--color-brand-600)"
                : "3px solid transparent",
            })}
          >
            <span style={{ fontSize: "1.05rem" }}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Profile footer */}
      <div
        className="d-flex align-items-center gap-2 px-4 py-3"
        style={{ borderTop: "1px solid var(--color-grey-200)" }}
      >
        <div
          className="d-flex align-items-center justify-content-center rounded-circle fw-bold"
          style={{
            width: "38px",
            height: "38px",
            backgroundColor: "var(--color-brand-600)",
            color: "var(--color-blue-text)",
            fontSize: "0.9rem",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div style={{ overflow: "hidden" }}>
          <div
            className="fw-semibold text-truncate"
            style={{ color: "var(--color-grey-900)", fontSize: "0.9rem" }}
          >
            {profile?.name || "..."}
          </div>
          <div className="text-truncate" style={{ color: "var(--color-grey-500)", fontSize: "0.75rem" }}>
            {profile?.role === "admin" ? "Academy Admin" : profile?.role || ""}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;